import { View } from '@slack/bolt';

import { DropdownValues } from '@interfaces/notionValues';
import { getCreateTaskBlocks } from '../utils';

export const tasks = {
  createTaskView: (dropDownValues: DropdownValues, initialUserId: string): View => {
    const blocks = getCreateTaskBlocks(dropDownValues, initialUserId);
    return {
      callback_id: 'submit-form',
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'My App',
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
  }
};
