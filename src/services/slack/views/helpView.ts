import { KnownBlock } from '@slack/bolt';

import {
  SLACK_HELP_COMMAND_ARGUMENT,
  SLACK_LIST_TASKS_COMMAND_ARGUMENT,
  SLACK_MAIN_SLASH_COMMAND,
  SLACK_NEW_TASK_COMMAND_ARGUMENT
} from '@utils/constants';
import { sectionBlock } from '../blocks';

export const helpView = () => {
  const blocks: KnownBlock[] = [
    sectionBlock(`Hi there 👋, I'm Alfonso. I'm here to help you manage your tasks in Notion.`),
    sectionBlock('Currently there are :three: available commands:'),
    sectionBlock(
      `*:one: Create task.*. Type \`${SLACK_MAIN_SLASH_COMMAND} ${SLACK_NEW_TASK_COMMAND_ARGUMENT}\` to create a task.`
    ),
    sectionBlock(
      `*:two: List tasks.* Type \`${SLACK_MAIN_SLASH_COMMAND} ${SLACK_LIST_TASKS_COMMAND_ARGUMENT}\` to list incomplete tasks.`
    ),
    sectionBlock(
      `*:three: Help.* Type \`${SLACK_MAIN_SLASH_COMMAND} ${SLACK_HELP_COMMAND_ARGUMENT}\` to list available commands.`
    )
  ];
  return blocks;
};
