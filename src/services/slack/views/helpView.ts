import { KnownBlock } from '@slack/bolt';

import { sectionBlock } from '../blocks';

export const helpView = () => {
  const blocks: KnownBlock[] = [
    sectionBlock(`Hi there 👋, I'm Alfonso. I'm here to help you manage your tasks in Notion.`),
    sectionBlock('Currently there are :three: available commands:'),
    sectionBlock('*:one: Create task.*. Type `/notion new` to create a task.'),
    sectionBlock('*:two: List tasks.* Type `/notion tasks` to list incomplete tasks.'),
    sectionBlock('*:three: Help.* Type `/notion help` to list available commands.')
  ];
  return blocks;
};
