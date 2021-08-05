import { AckFn, App, RespondArguments, SlashCommand } from '@slack/bolt';

import {
  SLACK_MAIN_SLASH_COMMAND,
  SLACK_HELP_COMMAND_ARGUMENT,
  SLACK_LIST_TASKS_COMMAND_ARGUMENT,
  SLACK_NEW_TASK_COMMAND_ARGUMENT,
  SLACK_UNKNOWN_COMMAND_ARGUMENT
} from '@utils/constants';
import {
  triggerCreateTaskCommand,
  triggerHelpCommand,
  triggerTaskListingCommand,
  triggerUnknownCommand
} from './commands';
import { slackCommands } from './constants';

const availableCommands = {
  [SLACK_HELP_COMMAND_ARGUMENT]: triggerHelpCommand,
  [SLACK_LIST_TASKS_COMMAND_ARGUMENT]: triggerTaskListingCommand,
  [SLACK_NEW_TASK_COMMAND_ARGUMENT]: triggerCreateTaskCommand,
  [SLACK_UNKNOWN_COMMAND_ARGUMENT]: triggerUnknownCommand
};

const parseCommand = (command: string) => slackCommands[command] || slackCommands.unknown;

const executeCommand = async (
  payload: SlashCommand,
  slackClient: App,
  ack: AckFn<string | RespondArguments>
) => {
  ack();
  const parsedCommand = parseCommand(payload.text);
  await availableCommands[parsedCommand](slackClient, payload);
};
export const configureCommands = async (slackClient: App) => {
  slackClient.command(SLACK_MAIN_SLASH_COMMAND, async ({ ack, payload }) => {
    await executeCommand(payload, slackClient, ack);
  });
};
