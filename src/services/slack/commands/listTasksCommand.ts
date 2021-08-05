import { App, SlashCommand } from '@slack/bolt';

import * as Notion from '@services/notion';
import { listTasksView } from '@services/slack/views';

export const triggerTaskListingCommand = async (slackClient: App, payload: SlashCommand) => {
  const {
    profile: { email }
  } = await slackClient.client.users.profile.get({ user: payload.user_id });
  const notionUser = await Notion.getUserByEmail(email);
  const incompleteTasks = await Notion.getIncompleteTasksByUserId(notionUser);
  const incompleteTasksBlocks = listTasksView(incompleteTasks);
  await slackClient.client.chat.postEphemeral({
    channel: payload.channel_id,
    user: payload.user_id,
    blocks: incompleteTasksBlocks
  });
};
