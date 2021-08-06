import {
  DatePropertyValue,
  Property,
  SelectOptionWithId,
  SelectProperty
} from '@notionhq/client/build/src/api-types';

import {
  DATABASE_PROPERTY_ESTIMATE,
  DATABASE_PROPERTY_PRIORITY,
  DATABASE_PROPERTY_SPRINT,
  DATABASE_PROPERTY_STATUS,
  DATABASE_PROPERTY_TYPE
} from '@utils/constants';
import { DropdownValues } from '@interfaces/notionValues';
import { Task } from '@interfaces/tasks';

// TODO: fix any type
export const mapNotionPageToTask = (page: any): Task => {
  const { Projects, Timeline } = page.properties;
  const taskName = Projects.title[0].plain_text;
  const taskDueDate = new Date((Timeline as DatePropertyValue)?.date?.end);
  const task: Task = {
    name: taskName,
    url: page.url,
    dueDate: taskDueDate
  };
  return task;
};

export const mapNotionPropertiesToSlackViewValues = (properties: {
  [key: string]: Property;
}): DropdownValues => {
  const databaseColumnNames = [
    DATABASE_PROPERTY_STATUS,
    DATABASE_PROPERTY_TYPE,
    DATABASE_PROPERTY_PRIORITY,
    DATABASE_PROPERTY_ESTIMATE,
    DATABASE_PROPERTY_SPRINT
  ];
  const mappedValues = databaseColumnNames.reduce((values, column: string) => {
    const property = properties[column] as SelectProperty;
    const allColumnValues: { id: string; text: string }[] = (
      property.select.options as SelectOptionWithId[]
    ).map(({ id, name }) => ({
      id,
      text: name
    }));
    const columnDefaultValue: { id: string; text: string } = allColumnValues.find(
      p => p.id === process.env[`NOTION_DEFAULT_${column.toUpperCase()}_ID`]
    );
    const columnName = column.toLowerCase();
    const result = {
      [columnName]: {
        values: allColumnValues,
        defaultValue: columnDefaultValue ?? allColumnValues[allColumnValues.length - 1]
      }
    };
    return { ...values, ...result };
  }, {} as DropdownValues);

  return mappedValues;
};
