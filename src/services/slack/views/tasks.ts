import { KnownBlock, View } from '@slack/bolt';
import { DropdownValues } from 'src/interfaces/notionValues';
import {
  generateDividerBlock,
  generateInputBlock,
  generateSelectBlock,
  generateUserSelectBlock,
} from '../utils';

const tasks = {
  createTask: (dropDownValues: DropdownValues, initialUserId: string): View => {
    // FIXME: this should be an util function
    const blocks: KnownBlock[] = [
      generateUserSelectBlock('Accountable', 'please select accountable', initialUserId),
      generateDividerBlock(),
      generateUserSelectBlock('Reviewer', 'please select accountable', initialUserId),
      generateDividerBlock(),
      generateInputBlock('Title', 'Please enter a title'),
      generateDividerBlock(),
      generateInputBlock('Description', 'Please enter a description', true, true),
      generateDividerBlock(),
      generateSelectBlock('Type', 'Please select a type', dropDownValues.type),
      generateDividerBlock(),
      generateSelectBlock('Status', 'please select a status', dropDownValues.status),
      generateDividerBlock(),
      generateSelectBlock('Priority', 'please select a priority', dropDownValues.priority),
      generateDividerBlock(),
      generateSelectBlock('Estimate', 'please select story points', dropDownValues.estimate),
      generateDividerBlock()
    ];
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
export default tasks;
