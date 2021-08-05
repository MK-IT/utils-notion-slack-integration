import { SectionBlock } from '@slack/bolt';

export const sectionBlockUrl = (
  label: string,
  buttonUrl: string,
  buttonText: string = 'View'
): SectionBlock => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: label
  },
  accessory: {
    type: 'button',
    text: {
      type: 'plain_text',
      text: buttonText,
      emoji: true
    },
    url: buttonUrl
  }
});
