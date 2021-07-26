import {
  DividerBlock,
  InputBlock,
  KnownBlock,
  Option,
  Action,
} from "@slack/bolt";
import { dropdownValue, InnerValue } from "src/interfaces/notionValues";

export enum SelectType {
  SingleSelect = "static_select",
  MultiSelect = "multi_static_select",
}
const mapDropdownValuesToBlockOptions = (values: InnerValue[]): Option[] => {
  return values.map((value) => {
    return {
      text: {
        type: "plain_text",
        text: value.text,
        emoji: true,
      },
      value: value.id,
    };
  });
};

export const generateSelectBlock = (
  label: string,
  placeholder: string,
  dropdownValue: dropdownValue,
  type: SelectType = SelectType.SingleSelect
): KnownBlock => {
  const id = label.split(" ").join(" ").toLowerCase();
  return {
    type: "input",
    element: {
      type: type as any,
      placeholder: {
        type: "plain_text",
        text: placeholder,
        emoji: true,
      },
      options: mapDropdownValuesToBlockOptions(dropdownValue.values),
      action_id: id,
      initial_option: {
        text: {
          type: "plain_text",
          text: dropdownValue.defaultValue.text,
          emoji: true,
        },
        value: dropdownValue.defaultValue.id,
      },
    },
    block_id: id,
    label: {
      type: "plain_text",
      text: label,
      emoji: true,
    },
  };
};

export const generateUserSelectBlock = (
  label: string,
  placeholder: string,
  initialUserId: string = undefined
): KnownBlock => {
  const id = label.toLowerCase();
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: label,
    },
    accessory: {
      type: "users_select",
      placeholder: {
        type: "plain_text",
        text: placeholder,
        emoji: true,
      },
      initial_user: initialUserId,
      action_id: id,
    },
    block_id: id,
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
    type: "input",
    element: {
      type: "plain_text_input",
      multiline,
      placeholder: {
        type: "plain_text",
        text: placeholder,
        emoji: true,
      },
      action_id: id,
    },
    optional,
    label: {
      type: "plain_text",
      text: label,
      emoji: true,
    },
    block_id: id,
  };
};

export const generateDividerBlock = (): DividerBlock => {
  return {
    type: "divider",
  };
};
