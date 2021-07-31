import { App, SlashCommand } from '@slack/bolt';

import {
  SLACK_HELP_SLASH_COMMAND_ARGUMENT,
  SLACK_LIST_TASKS_SLASH_COMMAND_ARGUMENT,
  SLACK_NEW_TASK_SLASH_COMMAND_ARGUMENT,
  SLACK_UNKNOWN_SLASH_COMMAND_ARGUMENT
} from '@utils/constants';
import { triggerCreateTaskCommand } from './commands';

export const executeCommand = (command: string, payload: SlashCommand, client: App) => {
  executionCommands[command](payload, client);
};

const triggerHelpCommand = () => {
  console.log('trigger help cmd ...');
};

const triggerUnknownCommand = () => {
  console.log('trigger unknown cmd...');
  triggerHelpCommand();
};

const triggerTaskListingCommand = () => {
  console.log('trigger task listing cmd...');
};

const executionCommands = {
  [SLACK_HELP_SLASH_COMMAND_ARGUMENT]: triggerHelpCommand,
  [SLACK_LIST_TASKS_SLASH_COMMAND_ARGUMENT]: triggerTaskListingCommand,
  [SLACK_NEW_TASK_SLASH_COMMAND_ARGUMENT]: triggerCreateTaskCommand,
  [SLACK_UNKNOWN_SLASH_COMMAND_ARGUMENT]: triggerUnknownCommand
};
