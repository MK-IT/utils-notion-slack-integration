import { App } from '@slack/bolt';

import { tasks } from '../views/tasks';
import * as Notion from '../../notion';

export const configureCommands = async (client: App) => {
  // command to add a task
  client.command('/notion', async ({ ack, payload }) => {
    ack();

    const dropdownValues = await Notion.getSlackCreateTaskViewValues();
    // opens add task modal
    await client.client.views.open({
      trigger_id: payload.trigger_id,
      view: tasks.createTaskView(dropdownValues, payload.user_id)
    });
  });
};
