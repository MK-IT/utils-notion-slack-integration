import {
  DATABASE_PROPERTY_ESTIMATE,
  DATABASE_PROPERTY_PRIORITY,
  DATABASE_PROPERTY_SPRINT,
  DATABASE_PROPERTY_STATUS,
  DATABASE_PROPERTY_TYPE
} from '@utils/constants';
import { DropdownValues, InnerValue } from '@interfaces/notionValues';
import { Task } from '@interfaces/tasks';

// TODO: fix any type
export const mapNotionPageToTask = (page: any): Task => {
  const task: Task = {
    name: page.properties.Projects.title[0]?.text?.content,
    url: page.url,
    dueDate: new Date(page.properties.Timeline.date.end)
  };
  return task;
};

// FIXME: SHAME
export const mapNotionPropertiesToSlackViewValues = (properties: any): DropdownValues => {
  const databaseColumnNames = [
    DATABASE_PROPERTY_STATUS,
    DATABASE_PROPERTY_TYPE,
    DATABASE_PROPERTY_PRIORITY,
    DATABASE_PROPERTY_ESTIMATE,
    DATABASE_PROPERTY_SPRINT
  ];
  // FIXME: any type
  const mappedValues: any = databaseColumnNames.map(column => {
    const allColumnValues: InnerValue[] = properties[column].select.options.map(
      ({ id, name }: { id: string; name: string }) => ({
        id,
        text: name
      })
    );
    const columnDefaultValue: InnerValue =
      allColumnValues.find(
        p => p.id === process.env[`NOTION_DEFAULT_${column.toUpperCase()}_ID`]
        // TODO: Set initialValue for sprints;
        // Sets the last created sprint as default
        // FIXME: think of a better solution
      ) ?? allColumnValues[allColumnValues.length - 1];
    const columnName = column.toLowerCase();
    return {
      [columnName]: {
        values: allColumnValues,
        defaultValue: columnDefaultValue
      }
    };
  });
  const result: DropdownValues = Object.assign({}, ...mappedValues);
  return result;
};
