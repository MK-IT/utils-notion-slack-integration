import { User } from '@notionhq/client/build/src/api-types';

export interface Task {
  name: string;
  dueDate?: Date;
  url: string;
}

export interface CreateTaskParams {
  title: string;
  status: string; // status id
  priority: string; // priority id
  estimate: string; // story points Id
  accountable: User;
  reviewer: User;
  timeline: {
    start: string;
    end?: string;
  };
}
