import { App } from "@slack/bolt";
import { tasks } from "../views/tasks";
import * as Notion from "../../notion";
export const configureCommands = async (client: App) => {
  // command to add a task
  client.command("/notion", async ({ ack, payload }) => {
    ack();
    const { trigger_id, user_id } = payload;
    const dropdownValues = await Notion.getValues();
    // opens add task modal
    await client.client.views.open({
      trigger_id,
      view: tasks.createTask(dropdownValues, user_id),
    });
  });
};
