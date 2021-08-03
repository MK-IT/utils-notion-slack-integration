import { KnownBlock } from '@slack/bolt';

import { sectionBlock } from '../blocks';

export const getHelpBlocks = () => {
  const blocks: KnownBlock[] = [
    sectionBlock(
      `Hey there 👋 I'm TaskBot. I'm here to help you create and manage tasks in Notion via Slack.\nCurrently there are :three: available commands:`
    ),
    sectionBlock(
      '*:one: Create task command*. Type `/notion new` and i will open a modal for you.'
    ),
    sectionBlock(
      '*:two: List incomplete tasks.* If you want to your incomplete tasks, type `/notion tasks` and i will list them for you.'
    ),
    sectionBlock(
      '*:three: Help command.* If you are not sure how to use me, please type `/notion help` and i will list my available commands for you.'
    )
  ];
  return blocks;
};
