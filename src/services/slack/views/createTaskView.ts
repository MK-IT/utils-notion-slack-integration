import { View, KnownBlock } from '@slack/bolt';

import { DropdownValues } from '@interfaces/notionValues';
import { formatDate } from '@utils/date';
import { datepickerBlock, dividerBlock, inputBlock, selectBlock, userBlock } from '../blocks';

const createTaskViewBlocks = (
  { type, status, priority, estimate }: DropdownValues,
  initialUserId: string
) => {
  const today = new Date();
  const initialDate = formatDate(today);
  const blocks: KnownBlock[] = [
    userBlock('Accountable', 'please select accountable', initialUserId),
    dividerBlock(),
    userBlock('Reviewer', 'please select accountable', initialUserId),
    dividerBlock(),
    inputBlock('Title', 'Please enter a title'),
    dividerBlock(),
    inputBlock('Description', 'Please enter a description', true, true),
    dividerBlock(),
    selectBlock('Type', 'Please select a type', type),
    dividerBlock(),
    selectBlock('Status', 'please select a status', status),
    dividerBlock(),
    selectBlock('Priority', 'please select a priority', priority),
    dividerBlock(),
    selectBlock('Estimate', 'please select story points', estimate),
    dividerBlock(),
    datepickerBlock('Start', 'please select start date', initialDate),
    dividerBlock(),
    datepickerBlock('End', 'please select end date', null, true)
  ];
  return blocks;
};

export const createTaskView = (dropDownValues: DropdownValues, initialUserId: string): View => {
  const blocks = createTaskViewBlocks(dropDownValues, initialUserId);
  return {
    callback_id: 'submit-form',
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Create Task',
      emoji: true
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
      emoji: true
    },
    close: {
      type: 'plain_text',
      text: 'Cancel',
      emoji: true
    },
    blocks
  };
};
