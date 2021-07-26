import { CompoundFilter, Filter, PeopleFilter } from '@notionhq/client/build/src/api-types';
import { NOT_STARTED_STATUS_TEXT, IN_PROGRESS_STATUS_TEXT } from '../../../utils/constants';

const incompleteStatuses = [NOT_STARTED_STATUS_TEXT, IN_PROGRESS_STATUS_TEXT];

// TODO: add rule to prefer named imports
// eslint-disable-next-line import/prefer-default-export
export const getIncompleteTasksByUserFilters = (userId: string): Filter[] => {
  const filterByUserId: PeopleFilter = {
    property: 'Accountable',
    people: {
      contains: userId
    }
  };

  const filters: Filter[] = incompleteStatuses.map(status => {
    const filter: CompoundFilter = {
      and: [
        filterByUserId,
        {
          property: 'Status',
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
