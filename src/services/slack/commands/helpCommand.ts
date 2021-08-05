import { App, SlashCommand } from '@slack/bolt';

import { helpView } from '@services/slack/views';

export const triggerHelpCommand = async (slackClient: App, payload: SlashCommand) => {
  const blocks = helpView();
  await slackClient.client.chat.postEphemeral({
    channel: payload.channel_id,
    user: payload.user_id,
    blocks
  });
};
