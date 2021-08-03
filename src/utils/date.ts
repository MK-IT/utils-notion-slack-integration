// parse formatted date (yyyy-mm-dd) to Date
export const parseDate = (date: Date | string): Date => {
  const parsedDate = new Date(date);
  return parsedDate;
};

// formats a date to yyyy-mm-dd
export const formatDate = (date: Date | string): string => {
  const parsedDate = parseDate(date);
  const formattedDate = parsedDate.toISOString().slice(0, 10);
  return formattedDate;
};
