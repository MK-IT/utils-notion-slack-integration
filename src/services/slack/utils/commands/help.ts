import { AckFn, App, RespondArguments, SlashCommand } from '@slack/bolt';

import { getHelpBlocks } from '@services/slack/views/help';

export const triggerHelpCommand = async (
  client: App,
  ack: AckFn<string | RespondArguments>,
  payload: SlashCommand
) => {
  const { channel_id, user_id } = payload;
  ack();
  const blocks = getHelpBlocks();
  await client.client.chat.postEphemeral({
    channel: channel_id,
    user: user_id,
    blocks
  });
};
