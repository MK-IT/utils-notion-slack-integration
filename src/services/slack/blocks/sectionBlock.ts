import { SectionBlock } from '@slack/bolt';

export const sectionBlock = (text: string): SectionBlock => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text
  }
});
