import { App, SlashCommand } from '@slack/bolt';

import {
  SLACK_HELP_SLASH_COMMAND_ARGUMENT,
  SLACK_LIST_TASKS_SLASH_COMMAND_ARGUMENT,
  SLACK_NEW_TASK_SLASH_COMMAND_ARGUMENT,
  SLACK_UNKNOWN_SLASH_COMMAND_ARGUMENT
} from '@utils/constants';

export const executeCommand = (command: string, payload: SlashCommand, client: App) => {
  executionCommands[command](payload, client);
};

const triggerHelpCommand = () => {
  console.log('trigger help cmd ...');
};
const triggerCreateTaskCommand = () => {
  console.log('trigger creating task cmd...');
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
