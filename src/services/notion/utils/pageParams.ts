import { PagesCreateParameters } from '@notionhq/client/build/src/api-endpoints';

import { CreateTaskParams } from '@interfaces/tasks';

export const getNotionCreateTaskPageParams = ({
  title,
  status,
  priority,
  estimate,
  timeline,
  accountable,
  reviewer
}: CreateTaskParams): PagesCreateParameters => ({
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
    }
  }
});
