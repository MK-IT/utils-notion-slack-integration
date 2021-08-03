import { App, SlashCommand } from '@slack/bolt';

import * as Notion from '@services/notion';
import { getListTasksBlocks } from '@services/slack/views/listTasks';

export const triggerTaskListingCommand = async (client: App, payload: SlashCommand) => {
  const {
    profile: { email }
  } = await client.client.users.profile.get({ user: payload.user_id });
  const notionUser = await Notion.getUserByEmail(email);
  const incompleteTasks = await Notion.getIncompleteTasksByUserId(notionUser);
  const incompleteTasksBlocks = getListTasksBlocks(incompleteTasks);
  await client.client.chat.postEphemeral({
    channel: payload.channel_id,
    user: payload.user_id,
    blocks: incompleteTasksBlocks
  });
};
