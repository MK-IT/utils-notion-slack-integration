import { DropdownValue } from '@interfaces/notionValues';
import { KnownBlock } from '@slack/bolt';

import { mapSelectValues } from '../utils/mappings';

export const selectBlock = (
  label: string,
  placeholder: string,
  dropdownValue: DropdownValue,
  type = 'static_select'
): KnownBlock => {
  const id = label.split(' ').join(' ').toLowerCase();
  return {
    type: 'input',
    element: {
      type: type as any,
      placeholder: {
        type: 'plain_text',
        text: placeholder,
        emoji: true
      },
      options: mapSelectValues(dropdownValue.values),
      action_id: id,
      initial_option: {
        text: {
          type: 'plain_text',
          text: dropdownValue.defaultValue.text,
          emoji: true
        },
        value: dropdownValue.defaultValue.id
      }
    },
    block_id: id,
    label: {
      type: 'plain_text',
      text: label,
      emoji: true
    }
  };
};