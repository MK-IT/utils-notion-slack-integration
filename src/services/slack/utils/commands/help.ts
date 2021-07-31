import { AckFn, App, RespondArguments, SlashCommand } from '@slack/bolt';

export const triggerHelpCommand = async (
  client: App,
  ack: AckFn<string | RespondArguments>,
  payload: SlashCommand
) => {
  const { channel_id, user_id } = payload;
  ack();
  await client.client.chat.postEphemeral({
    channel: channel_id,
    user: user_id,
    text: 'listing help command...'
  });
};
