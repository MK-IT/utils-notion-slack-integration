import { App, SlashCommand } from '@slack/bolt';

import { getHelpBlocks } from '@services/slack/views/help';

export const triggerHelpCommand = async (client: App, payload: SlashCommand) => {
  const blocks = getHelpBlocks();
  await client.client.chat.postEphemeral({
    channel: payload.channel_id,
    user: payload.user_id,
    blocks
  });
};
