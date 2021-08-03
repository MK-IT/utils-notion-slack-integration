import { InputBlock } from '@slack/bolt';

export const inputBlock = (
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
