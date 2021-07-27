export const getParsedTodayDate = () => {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${dayOfMonth}`;
};
