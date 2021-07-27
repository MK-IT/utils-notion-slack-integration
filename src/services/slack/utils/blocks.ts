import { KnownBlock } from '@slack/bolt';

import {
  generateDatePickerBlock,
  generateDividerBlock,
  generateInputBlock,
  generateSelectBlock,
  generateUserSelectBlock
} from './';
import { DropdownValues } from '@interfaces/notionValues';

export const getCreateTaskBlocks = ({type, status, priority, estimate}: DropdownValues, initialUserId: string) => {
  const blocks: KnownBlock[] = [
    generateUserSelectBlock('Accountable', 'please select accountable', initialUserId),
    generateDividerBlock(),
    generateUserSelectBlock('Reviewer', 'please select accountable', initialUserId),
    generateDividerBlock(),
    generateInputBlock('Title', 'Please enter a title'),
    generateDividerBlock(),
    generateInputBlock('Description', 'Please enter a description', true, true),
    generateDividerBlock(),
    generateSelectBlock('Type', 'Please select a type', type),
    generateDividerBlock(),
    generateSelectBlock('Status', 'please select a status', status),
    generateDividerBlock(),
    generateSelectBlock('Priority', 'please select a priority', priority),
    generateDividerBlock(),
    generateSelectBlock('Estimate', 'please select story points', estimate),
    generateDividerBlock(),
    generateDatePickerBlock('Start', 'please select start date'),
    generateDividerBlock(),
    generateDatePickerBlock('End', 'please select end date')
  ];
  return blocks;
}
