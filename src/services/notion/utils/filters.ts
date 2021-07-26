import { CompoundFilter, Filter, PeopleFilter } from "@notionhq/client/build/src/api-types";
import { NOT_STARTED_STATUS_TEXT, IN_PROGRESS_STATUS_TEXT } from "src/utils/constants";


const incompleteStatuses = [NOT_STARTED_STATUS_TEXT, IN_PROGRESS_STATUS_TEXT];

const getIncompleteTasksByUserFilters = (userId: string): Filter[] => {
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
  })

  return filters
}

export default getIncompleteTasksByUserFilters;
