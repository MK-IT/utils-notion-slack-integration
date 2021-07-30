// formats a date to yyyy-mm-dd
export const formatDate = (date : Date) : string => {
  const formattedDate = new Date().toISOString().slice(0, 10);
  return formattedDate;
};

// parse formatted date (yyy-mm-dd) to date object
export const parseDate = (date: string) : Date => {
  const parsedDate =  new Date(date);
  return parsedDate;
 }
