import { Option } from '@slack/bolt';

import { InnerValue } from '@interfaces/notionValues';

export const mapDropdownValuesToBlockOptions = (values: InnerValue[]): Option[] =>
  values.map(value => ({
    text: {
      type: 'plain_text',
      text: value.text,
      emoji: true
    },
    value: value.id
  }));
