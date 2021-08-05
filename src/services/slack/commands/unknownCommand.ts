import { App, SlashCommand } from '@slack/bolt';

import { SLACK_HELP_COMMAND_ARGUMENT, SLACK_MAIN_SLASH_COMMAND } from '@utils/constants';

export const triggerUnknownCommand = async (slackClient: App, payload: SlashCommand) => {
  await slackClient.client.chat.postEphemeral({
    channel: payload.channel_id,
    user: payload.user_id,
    text: `The command \`${payload.text}\` is not recognized.\nType \`${SLACK_MAIN_SLASH_COMMAND} ${SLACK_HELP_COMMAND_ARGUMENT}\` to see the available commands.`
  });
};
