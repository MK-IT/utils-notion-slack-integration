import { AckFn, App, RespondArguments, SlashCommand } from "@slack/bolt";

import * as Notion from '@services/notion';
import {tasks} from '@services/slack/views/tasks'
export const triggerCreateTaskCommand = async (client: App, ack: AckFn<string | RespondArguments> , payload: SlashCommand) => {
  ack();
  const dropdownValues = await Notion.getSlackCreateTaskViewValues();
  // opens add task modal
  await client.client.views.open({
    trigger_id: payload.trigger_id,
    view: tasks.createTask(dropdownValues, payload.user_id)
  });
};
