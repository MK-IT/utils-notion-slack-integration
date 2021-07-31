import { KnownBlock, Option } from '@slack/bolt';

import { InnerValue } from '@interfaces/notionValues';
import { Task } from '@interfaces/tasks';
import { sectionBlockUrl } from '../blocks';

export const mapSelectValues = (values: InnerValue[]): Option[] =>
  values.map(value => ({
    text: {
      type: 'plain_text',
      text: value.text,
      emoji: true
    },
    value: value.id
  }));

export const mapTaskToSectionWithButtonBlocks = (tasks: Task[]): KnownBlock[] => {
  const blocks = tasks.map(task => sectionBlockUrl(task.name, task.url));
  return blocks;
};
