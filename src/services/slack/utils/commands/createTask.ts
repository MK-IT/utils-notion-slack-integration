import { App, SlashCommand } from '@slack/bolt';

import * as Notion from '@services/notion';
import { createTaskView } from '@services/slack/views';

export const triggerCreateTaskCommand = async (client: App, payload: SlashCommand) => {
  const dropdownValues = await Notion.getSlackCreateTaskViewValues();
  await client.client.views.open({
    trigger_id: payload.trigger_id,
    view: createTaskView(dropdownValues, payload.user_id)
  });
};
