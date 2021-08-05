import { KnownBlock } from '@slack/bolt';

import { Task } from '@interfaces/tasks';
import { dividerBlock, sectionBlock, sectionBlockUrl } from '../blocks';

const mapTaskToSectionWithButtonBlocks = (tasks: Task[]): KnownBlock[] => {
  const blocks = tasks.map(task => sectionBlockUrl(task.name, task.url));
  return blocks;
};

export const listTasksView = (tasks: Task[]): KnownBlock[] => {
  const hasTasks = tasks?.length > 0;
  const titleBlock: KnownBlock[] = [sectionBlock('List of your tasks:'), dividerBlock()];
  const noTasksBlock = [sectionBlock('You have no tasks :raised_hands:')];
  const tasksBlock = mapTaskToSectionWithButtonBlocks(tasks);

  const blocks = titleBlock.concat(hasTasks ? tasksBlock : noTasksBlock);
  return blocks;
};
