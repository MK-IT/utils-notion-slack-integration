import { KnownBlock } from "@slack/bolt"

import {generateSectionBlock} from '@services/slack/utils'
export const getHelpBlocks = () => {

  const blocks: KnownBlock[] = [
    generateSectionBlock(`Hey there 👋 I'm TaskBot. I'm here to help you create and manage tasks in Notion via Slack.\nCurrently there are :three: available commands:`),
    generateSectionBlock('*:one: Create task command*. Type `/notion new` and i will open a modal for you.'),
    generateSectionBlock('*:two: List incomplete tasks.* If you want to your incomplete tasks, type `/notion tasks` and i will list them for you.'),
    generateSectionBlock('*:three: Help command.* If you are not sure how to use me, please type `/notion help` and i will list my available commands for you.')

  ]
  return blocks;
}
