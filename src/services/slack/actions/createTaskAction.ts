import { App, ViewStateValue, ViewSubmitAction } from '@slack/bolt';
import { User } from '@notionhq/client/build/src/api-types';

import * as Notion from '@services/notion';
import { CreateTaskParams } from '@interfaces/tasks';

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
      ack();
      const { values } = payload.state;
      const slackAccountableUserEmail = await (
        await client.users.profile.get({ user: values.accountable.accountable.selected_user })
      ).profile.email;
      const accountable = await Notion.getUserByEmail(slackAccountableUserEmail);

      const slackReviewerUserEmail = await (
        await client.users.profile.get({ user: values.reviewer.reviewer.selected_user })
      ).profile.email;
      const reviewer = await Notion.getUserByEmail(slackReviewerUserEmail);
      const params = mapCreateTaskSubmitValuesToParams(values, accountable, reviewer);

      await Notion.createTask(params);
      // TODO: check if timeline start date is less than today and send error msg
      // TODO: check if timeline end date is less than start date and send error msg
      // Example error handling:
      // ack({
      //   response_action: 'errors',
      //   errors: {
      //     title: 'Please enter a title'
      //   }
      // });
      // IMPORTANT: Please note that the errors object property names should match the action_id from payload.state.values

      // TODO: map the payload to notion create task params

      // TODO: call Notion.CreateTask with the mapped params and post ephemeral message with the task
    }
  );
};
