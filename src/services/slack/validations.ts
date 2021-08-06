import { User } from '@notionhq/client/build/src/api-types';

import { CreateTaskParams } from '@interfaces/tasks';
import Joi from 'joi';

export const createTaskSchema: Joi.ObjectSchema<CreateTaskParams> = Joi.object({
  title: Joi.any().required(),
  description: Joi.any(),
  type: Joi.string().required(),
  sprint: Joi.string().required(),
  status: Joi.string().required(),
  priority: Joi.string().required(),
  estimate: Joi.string().required(),
  accountable: Joi.object<User>().required(),
  reviewer: Joi.object<User>().required(),
  timeline: Joi.object({
    start: Joi.date().required(),
    end: Joi.any()
  })
});
