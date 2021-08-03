import { KnownBlock } from '@slack/bolt';

import { Task } from '@interfaces/tasks';
import { dividerBlock, sectionBlock, sectionBlockUrl } from '../blocks';

const mapTaskToSectionWithButtonBlocks = (tasks: Task[]): KnownBlock[] => {
  const blocks = tasks.map(task => sectionBlockUrl(task.name, task.url));
  return blocks;
};

export const getListTasksBlocks = (tasks: Task[]): KnownBlock[] => {
  const blocks = mapTaskToSectionWithButtonBlocks(tasks);
  const titleBlock: KnownBlock[] = [sectionBlock('List of your tasks:'), dividerBlock()];

  const result =
    blocks.length > 0
      ? titleBlock.concat(blocks)
      : [sectionBlock('You have no tasks :raised_hands:')];
  return result;
};
