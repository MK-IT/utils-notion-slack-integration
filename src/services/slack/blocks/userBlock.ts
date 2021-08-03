import { KnownBlock } from '@slack/bolt';

export const userBlock = (
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
