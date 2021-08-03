import { DividerBlock, InputBlock, KnownBlock } from '@slack/bolt';

import { DropdownValue } from 'src/interfaces/notionValues';
import { mapDropdownValuesToBlockOptions } from './mappings';

export enum SelectType {
  singleSelect = 'static_select',
  multiSelect = 'multi_static_select'
}

export const generateSelectBlock = (
  label: string,
  placeholder: string,
  dropdownValue: DropdownValue,
  type: SelectType = SelectType.singleSelect
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
      options: mapDropdownValuesToBlockOptions(dropdownValue.values),
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

export const generateUserSelectBlock = (
  label: string,
  placeholder: string,
  initialUserId: string = undefined
): KnownBlock => {
  const id = label.toLowerCase();
  return {
    type: 'input',
    element: {
      type: 'users_select',
      placeholder: {
        type: 'plain_text',
        text: placeholder,
        emoji: true
      },
      initial_user: initialUserId,
      action_id: id
    },
    label: {
      type: 'plain_text',
      text: label,
      emoji: true
    },
    block_id: id
  };
};

export const generateInputBlock = (
  label: string,
  placeholder: string,
  optional = false,
  multiline = false
): InputBlock => {
  const id = label.toLowerCase();
  return {
    type: 'input',
    element: {
      type: 'plain_text_input',
      multiline,
      placeholder: {
        type: 'plain_text',
        text: placeholder,
        emoji: true
      },
      action_id: id
    },
    optional,
    label: {
      type: 'plain_text',
      text: label,
      emoji: true
    },
    block_id: id
  };
};

export const generateDividerBlock = (): DividerBlock => ({
  type: 'divider'
});

export const generateDatePickerBlock = (label: string, placeholder: string,initialDate: string = null, optional:boolean = false): KnownBlock => {
  const id = label.toLowerCase();
  const block: KnownBlock = {
    type: 'input',
    optional,
    element: {
      type: 'datepicker',
      placeholder: {
        type: 'plain_text',
        text: placeholder,
        emoji: true
      },
      action_id: id
    },
    block_id: id,
    label: {
      type: 'plain_text',
      text: label,
      emoji: true
    }
  };

  if(initialDate){
    block.element['initial_date'] = initialDate
  }

  return block;
};
