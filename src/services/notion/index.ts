import { Client as NotionApp } from '@notionhq/client';
import { PersonUser, User } from '@notionhq/client/build/src/api-types';

import { CreateTaskParams, Task } from '@interfaces/tasks';
import { DropdownValues } from '@interfaces/notionValues';
import {
  mapNotionPageToTask,
  mapNotionPropertiesToSlackViewValues,
  getIncompleteTasksByUserFilters,
  getNotionCreateTaskPageParams
} from './utils';

const notion = new NotionApp({ auth: process.env.NOTION_API_TOKEN });

export const getUserByEmail = async (email: string) => {
  // TODO: notion.users.list() return a paginated response; there's a chance the user is not among the returned and we should "scroll" further
  const users = (await notion.users.list()).results;
  const user = users.find((u: PersonUser) => u.person.email === email);
  return user;
};

export const getIncompleteTasksByUserId = async (user: User): Promise<Task[]> => {
  const filters = getIncompleteTasksByUserFilters(user.id);
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      or: [...filters]
    }
  });

  const tasks = results.map(page => mapNotionPageToTask(page));

  return tasks;
};

export const createTask = async (createTaskParams: CreateTaskParams): Promise<Task> => {
  const params = getNotionCreateTaskPageParams(createTaskParams);
  const result = await notion.pages.create(params);

  const task = mapNotionPageToTask(result);
  return task;
};

// TODO: maybe rename this function
export const getSlackCreateTaskViewValues = async (): Promise<DropdownValues> => {
  const { properties } = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID
  });

  // TODO: refactor mapNotionPropertiesToDropdownValues()
  const notionValues = mapNotionPropertiesToSlackViewValues(properties);
  return notionValues;
};
