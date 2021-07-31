import { KnownBlock } from '@slack/bolt';

import { Task } from '@interfaces/tasks';
import { mapTaskToSectionWithButtonBlocks } from '../utils/mappings';
import { generateDividerBlock, generateSectionBlock } from '../utils';

export const getListTasksBlocks = (tasks: Task[]): KnownBlock[] => {
  const blocks = mapTaskToSectionWithButtonBlocks(tasks);
  const titleBlock: KnownBlock[] = [generateSectionBlock('List of your tasks:'), generateDividerBlock()];

  const result = blocks.length > 0 ? titleBlock.concat(blocks) : [generateSectionBlock('You have no tasks :raised_hands:')];
  return result;
};
