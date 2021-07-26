import { Client as NotionApp } from '@notionhq/client';
import { Page, PeopleFilter, PersonUser, SelectFilter, User } from '@notionhq/client/build/src/api-types';

import { CreateTaskParams, Task } from '../../interfaces/tasks';
import { DropdownValues } from '../../interfaces/notionValues';
import { mapNotionPageToTask, mapNotionPropertiesToDropdownValues } from './utils';

const notion = new NotionApp({ auth: process.env.NOTION_API_TOKEN });

export const getUserByEmail = async (email: string) => {
  // TODO: notion.users.list() return a paginated response; there's a chance the user is not among the returned and we should "scroll" further
  const users = (await notion.users.list()).results;
  const user = users.find((u: PersonUser) => u.person.email === email);
  return user;
};

export const getIncompleteTasksByUserId = async (user: User): Promise<Task[]> => {
  // TODO: extract property names and hard coded values
  const filterByUserId: PeopleFilter = {
    property: 'Accountable',
    people: {
      contains: user.id
    }
  };

  const filterByStatusNotStarted: SelectFilter = {
    property: 'Status',
    select: {
      equals: 'Not Started'
    }
  };

  const filterByStatusInProgress: SelectFilter = {
    property: 'Status',
    select: {
      equals: 'In Progress'
    }
  };

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      and: [filterByUserId],
      or: [filterByStatusNotStarted, filterByStatusInProgress]
    }
  });

  // TODO: refactor mapNotionPageToTask()
  const tasks = results.map(page => mapNotionPageToTask(page));

  return tasks;
};

export const createTask = async ({
  title,
  type,
  status,
  priority,
  estimate,
  timeline,
  sprint,
  accountable,
  reviewer
}: CreateTaskParams): Promise<Task> => {
  // TODO: refactor the create() object

  // FIXME: any type
  const result = (await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID
    },
    properties: {
      title: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: title
            }
          }
        ]
      },
      // CamelCase IS MANDATORY
      // TODO: maybe use column ids instead of names
      Accountable: {
        type: 'people',
        people: [accountable]
      },
      Reviewer: {
        type: 'people',
        people: [reviewer]
      },
      Priority: {
        type: 'select',
        select: {
          id: priority
        }
      },
      Sprint: {
        type: 'select',
        select: {
          id: sprint
        }
      },
      Status: {
        type: 'select',
        select: {
          id: status
        }
      },
      Estimate: {
        type: 'select',
        select: {
          id: estimate
        }
      },
      Timeline: {
        type: 'date',
        date: timeline
      },
      Type: {
        type: 'select',
        select: {
          id: type
        }
      }
    }
  })) as any;

  // FIXME: any type
  const page: Page = result;
  const task = mapNotionPageToTask(page);
  return task;
};

export const getValues = async (): Promise<DropdownValues> => {
  const values = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID
  });

  // FIXME: any type
  const props = values.properties as any;

  // TODO: refactor mapNotionPropertiesToDropdownValues()
  const notionValues = mapNotionPropertiesToDropdownValues(props);
  return notionValues;
};
