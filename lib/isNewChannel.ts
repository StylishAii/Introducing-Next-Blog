export function isNewChannel(dateToCompare: Date) {
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the two dates
    const timeDifference = dateToCompare.getTime() - currentDate.getTime();

    // Calculate the difference in days
    const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Check if the difference is less than or equal to 3 days
    return differenceInDays <= 1 ? false : true;
}
