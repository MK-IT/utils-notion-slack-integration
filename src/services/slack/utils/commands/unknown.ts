import { App, SlashCommand } from '@slack/bolt';

import { SLACK_HELP_SLASH_COMMAND_ARGUMENT, SLACK_MAIN_SLASH_COMMAND } from '@utils/constants';

export const triggerUnknownCommand = async (client: App, payload: SlashCommand) => {
  await client.client.chat.postEphemeral({
    channel: payload.channel_id,
    user: payload.user_id,
    text: `The command \`${payload.text}\` is not recognized.\n Please type \`${SLACK_MAIN_SLASH_COMMAND} ${SLACK_HELP_SLASH_COMMAND_ARGUMENT}\` to see the available commands`
  });
};
