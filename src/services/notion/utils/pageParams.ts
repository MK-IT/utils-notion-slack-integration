import { PagesCreateParameters } from "@notionhq/client/build/src/api-endpoints"
import { CreateTaskParams } from "../../../interfaces/tasks"

// TODO: add rule
// eslint-disable-next-line import/prefer-default-export
export const getNotionCreateTaskPageParams = ({
  title,
  type,
  status,
  priority,
  estimate,
  timeline,
  sprint,
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
  })
