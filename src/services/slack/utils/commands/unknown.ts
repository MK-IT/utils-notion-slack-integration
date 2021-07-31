import { AckFn, App, RespondArguments, SlashCommand } from '@slack/bolt';
import { triggerHelpCommand } from '.';

export const triggerUnknownCommand = async (
  client: App,
  ack: AckFn<string | RespondArguments>,
  payload: SlashCommand
) => {
  console.log('trigger unknown cmd...');
  await triggerHelpCommand(client, ack, payload);
};
