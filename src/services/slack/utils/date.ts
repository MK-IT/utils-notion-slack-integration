// formats a date to yyyy-mm-dd
export const formatDate = (date : Date) : string => {
  const formattedDate = new Date().toISOString().slice(0, 10);
  return formattedDate;
};
