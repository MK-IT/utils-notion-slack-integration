import { App } from '@slack/bolt';

import * as Notion from '@services/notion';
import { createTaskView } from '../views/createTaskView';

export const configureCommands = async (client: App) => {
  // command to add a task
  client.command('/notion', async ({ ack, payload }) => {
    ack();

    const dropdownValues = await Notion.getSlackCreateTaskViewValues();
    // opens add task modal
    await client.client.views.open({
      trigger_id: payload.trigger_id,
      view: createTaskView(dropdownValues, payload.user_id)
    });
  });
};
