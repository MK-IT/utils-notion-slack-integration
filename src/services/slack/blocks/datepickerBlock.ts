import { Datepicker, InputBlock, KnownBlock } from '@slack/bolt';

export const datepickerBlock = (
  label: string,
  placeholder: string,
  initialDate: string = null,
  optional: boolean = false
): KnownBlock => {
  const id = label.toLowerCase();
  const block: InputBlock = {
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

  if (initialDate) {
    (block.element as Datepicker).initial_date = initialDate;
  }

  return block;
};
