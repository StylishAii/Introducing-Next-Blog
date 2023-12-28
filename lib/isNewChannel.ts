export function isNewChannel(dateToCompare: string) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the two dates
  const timeDifference = currentDate.getTime() - new Date(dateToCompare).getTime();

  // Calculate the difference in days
  const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Check if the difference is less than or equal to 3 days
  return differenceInDays >= 3 ? true : false;
}
