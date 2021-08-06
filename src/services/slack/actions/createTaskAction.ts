import { App, ViewStateValue, ViewSubmitAction } from '@slack/bolt';
import { User } from '@notionhq/client/build/src/api-types';

import * as Notion from '@services/notion';
import { CreateTaskParams } from '@interfaces/tasks';
import { createTaskSchema } from '../validations';
import { dividerBlock, sectionBlock, sectionBlockUrl } from '../blocks';

const mapCreateTaskSubmitValuesToParams = (
  values: {
    [blockId: string]: {
      [actionId: string]: ViewStateValue;
    };
  },
  accountable: User,
  reviewer: User
): CreateTaskParams => ({
  accountable,
  reviewer,
  title: values.title.title.value,
  description: values.description.description.value,
  type: values.type.type.selected_option.value,
  status: values.status.status.selected_option.value,
  priority: values.priority.priority.selected_option.value,
  estimate: values.estimate.estimate.selected_option.value,
  sprint: values.sprint.sprint.selected_option.value,
  timeline: {
    start: values.start.start.selected_date,
    end: values.end.end.selected_date
  }
});

export const createTaskAction = (slackClient: App) => {
  slackClient.view<ViewSubmitAction>(
    { callback_id: 'submit-form' },
    async ({ ack, payload, client }) => {
      const { values } = payload.state;

      const accountableId = values.accountable.accountable.selected_user;
      const reviewerId = values.reviewer.reviewer.selected_user;

      const slackAccountableUserEmail = (await client.users.profile.get({ user: accountableId }))
        .profile.email;
      const accountable = await Notion.getUserByEmail(slackAccountableUserEmail);

      const slackReviewerUserEmail = (await client.users.profile.get({ user: reviewerId })).profile
        .email;
      const reviewer = await Notion.getUserByEmail(slackReviewerUserEmail);

      const params = mapCreateTaskSubmitValuesToParams(values, accountable, reviewer);
      const { error = null } = createTaskSchema.validate({ ...params });

      const isEndDateLaterThanStartDate =
        new Date(params.timeline.end).getTime() - new Date(params.timeline.start).getTime() < 0;

      if (isEndDateLaterThanStartDate && params.timeline.end !== null) {
        await ack({
          response_action: 'errors',
          errors: {
            end: 'End date should be less than start date!'
          }
        });
      } else if (error) {
        await ack({
          response_action: 'errors',
          errors: {
            [error.details[0].context.key]: error.details[0].message
          }
        });
      } else {
        await ack();
      }
      const task = await Notion.createTask(params);

      const reviewerAssignedATaskMsg = `<@${reviewerId}> assigned you a task.`;
      const msg = 'Task Created!';
      await client.chat.postEphemeral({
        channel: values.accountable.accountable.selected_user,
        user: values.accountable.accountable.selected_user,
        blocks: [
          sectionBlock(accountableId === reviewerId ? msg : reviewerAssignedATaskMsg),
          dividerBlock(),
          sectionBlockUrl(task.name, task.url)
        ]
      });
    }
  );
};
