import { App, SlashCommand } from '@slack/bolt';

import {
  SLACK_HELP_SLASH_COMMAND_ARGUMENT,
  SLACK_LIST_TASKS_SLASH_COMMAND_ARGUMENT,
  SLACK_NEW_TASK_SLASH_COMMAND_ARGUMENT,
  SLACK_UNKNOWN_SLASH_COMMAND_ARGUMENT
} from '@utils/constants';
import { triggerCreateTaskCommand, triggerHelpCommand, triggerTaskListingCommand, triggerUnknownCommand } from './commands';

export const executeCommand = (command: string, payload: SlashCommand, client: App) => {
  executionCommands[command](payload, client);
};

const executionCommands = {
  [SLACK_HELP_SLASH_COMMAND_ARGUMENT]: triggerHelpCommand,
  [SLACK_LIST_TASKS_SLASH_COMMAND_ARGUMENT]: triggerTaskListingCommand,
  [SLACK_NEW_TASK_SLASH_COMMAND_ARGUMENT]: triggerCreateTaskCommand,
  [SLACK_UNKNOWN_SLASH_COMMAND_ARGUMENT]: triggerUnknownCommand
};
