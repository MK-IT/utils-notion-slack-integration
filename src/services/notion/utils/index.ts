import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";

import { DropdownValues, InnerValue } from "../../../interfaces/notionValues";
import { Task } from "../../../interfaces/tasks";

export const mapNotionPageToTask = ({
  url,
  properties,
}: {
  url: string;
  properties: PropertyValueMap;
}): Task => {
  // FIXME: any type
  const props = properties as any;
  const task: Task = {
    name: props.projects.title[0]?.text?.content,
    url,
    dueDate: props.timeline?.date?.end,
  };
  return task;
};

// FIXME: SHAME
export const mapNotionPropertiesToDropdownValues = (
  properties: any
): DropdownValues => {
  const columnNames = ["Status", "Type", "Priority", "Estimate", "Sprint"];
  const notionValues: any = columnNames.map((column) => {
    const dropdownValues: InnerValue[] = (
      properties[column].select
        ? properties[column].select
        : properties[column].multi_select
    ).options.map(({ id, name }: { id: string; name: string }) => ({
      id,
      text: name,
    }));
    // story points have whitespace
    const dropdownName = column.split(" ").join("").toLowerCase();

    const defaultValue = dropdownValues.find(
      (p) =>
        p.id === process.env[`NOTION_DEFAULT_${dropdownName.toUpperCase()}_ID`]
    );
    return {
      [dropdownName]: {
        values: dropdownValues,
        defaultValue,
      },
    };
  });
  // TODO: Set initialValue for sprints;
  const result: DropdownValues = Object.assign({}, ...notionValues);
  return result;
};
