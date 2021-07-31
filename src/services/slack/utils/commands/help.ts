import { App, SlashCommand } from '@slack/bolt';

import { getHelpBlocks } from '@services/slack/views/help';

export const triggerHelpCommand = async (client: App, payload: SlashCommand) => {
  const { channel_id, user_id } = payload;
  const blocks = getHelpBlocks();
  await client.client.chat.postEphemeral({
    channel: channel_id,
    user: user_id,
    blocks
  });
};
