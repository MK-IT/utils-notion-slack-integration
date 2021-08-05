import { App, SlashCommand } from '@slack/bolt';

import * as Notion from '@services/notion';
import { createTaskView } from '@services/slack/views';

export const triggerCreateTaskCommand = async (slackClient: App, payload: SlashCommand) => {
  const dropdownValues = await Notion.getSlackCreateTaskViewValues();
  await slackClient.client.views.open({
    trigger_id: payload.trigger_id,
    view: createTaskView(dropdownValues, payload.user_id)
  });
};
