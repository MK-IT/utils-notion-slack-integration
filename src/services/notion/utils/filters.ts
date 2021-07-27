import { CompoundFilter, Filter, PeopleFilter } from '@notionhq/client/build/src/api-types';

import {
  DATABASE_PROPERTY_STATUS,
  DATABASE_PROPERTY_ACCOUNTABLE,
  STATUS_NOT_STARTED,
  STATUS_IN_PROGRESS
} from '@utils/constants';

const incompleteStatuses = [STATUS_NOT_STARTED, STATUS_IN_PROGRESS];

export const getIncompleteTasksByUserFilters = (userId: string): Filter[] => {
  const filterByUserId: PeopleFilter = {
    property: DATABASE_PROPERTY_ACCOUNTABLE,
    people: {
      contains: userId
    }
  };

  const filters: Filter[] = incompleteStatuses.map(status => {
    const filter: CompoundFilter = {
      and: [
        filterByUserId,
        {
          property: DATABASE_PROPERTY_STATUS,
          select: {
            equals: status
          }
        }
      ]
    };

    return filter;
  });

  return filters;
};
