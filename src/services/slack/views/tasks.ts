import { Block } from "@notionhq/client/build/src/api-types";
import { KnownBlock, View } from "@slack/bolt";
import { DropdownValues } from "src/interfaces/notionValues";
import {
  generateDividerBlock,
  generateInputBlock,
  generateSelectBlock,
  generateUserSelectBlock,
  SelectType,
} from "../utils";
export const tasks = {
  createTask: (dropDownValues: DropdownValues, initialUserId: string): View => {
    const blocks: KnownBlock[] = [
      generateUserSelectBlock(
        "Accountable",
        "please select accountable",
        initialUserId
      ),
      generateDividerBlock(),
      generateUserSelectBlock(
        "Reviewer",
        "please select accountable",
        initialUserId
      ),
      generateDividerBlock(),
      generateInputBlock("Title", "Please enter a title"),
      generateDividerBlock(),
      generateInputBlock(
        "Description",
        "Please enter a description",
        true,
        true
      ),
      generateDividerBlock(),
      generateSelectBlock("Type", "Please select a type", dropDownValues.type),
      generateDividerBlock(),
      generateSelectBlock(
        "Status",
        "please select a status",
        dropDownValues.status
      ),
      generateDividerBlock(),
      generateSelectBlock(
        "Priority",
        "please select a priority",
        dropDownValues.priority
      ),
      generateDividerBlock(),
      generateSelectBlock(
        "Story Points",
        "please select story points",
        dropDownValues.estimate
      ),
      generateDividerBlock(),

      // start date

      // end date

      // generateSelectBlock('Sprints', 'please select sprints', dropDownValues.sprints, SelectType.MultiSelect)
    ];
    return {
      callback_id: "submit-form",
      type: "modal",
      title: {
        type: "plain_text",
        text: "My App",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks,
    };
  },
};
