//-- all the months
const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type DateTimeFormatPartTypesRegistry = /*unresolved*/ any;

//--  the Type for the type property on the Date Time Format Part
type AcceptType = keyof DateTimeFormatPartTypesRegistry;
//   | "day"
//   | "hour"
//   | "minute"
//   | "month"
//   | "second"
//   | "year"
//   | "dayPeriod";

//--  the defualt parameter for the getIntlDateObj function
const defaultAcceptType: AcceptType[] = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
];

//-- return yesterday or a year ago or 2year ago or last month
export function formatDatePeriod(date: string | Date) {
  // getting an obj of all the date properties
  const dateObj = getIntlDateObj(new Date(date));
  const currentDateObj = getIntlDateObj(new Date());

  // destructuring
  const { month, year, day, hour, minute, second } = dateObj;

  const {
    month: currentMonth,
    year: currentYear,
    day: currentDay,
    hour: currentHour,
    minute: currentMinute,
    second: currentSecond,
  } = currentDateObj;

  // formatting the date
  if (year !== currentYear) {
    2025 - 2020;
    const amount = Number(currentYear) - Number(year);
    if (amount === 1) return "Last year";
    return `${amount} years ago`;
  } else if (month !== currentMonth) {
    const amount = allMonths.indexOf(currentMonth) - allMonths.indexOf(month);
    if (amount === 1) return "Last Month";
    return `${amount} months ago`;
  } else if (day !== currentDay)
    return `${Number(currentDay) - Number(day)} days ago`;
  else if (hour !== currentHour)
    return `${Number(currentHour) - Number(hour)} hours ago`;
  else if (minute !== currentMinute)
    return `${Number(currentMinute) - Number(minute)} minutes ago`;
  else if (second !== currentSecond)
    return `${Number(currentSecond) - Number(second)} seconds ago`;

  // returing a fallback if not staisfied conditions
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  }).format(new Date(date));
}

//-- getting and extrating the important properties from the Date Intl  with the date supplied.
function getIntlDateObj(
  date: Date,
  accept: AcceptType[] = defaultAcceptType
): { [key: AcceptType]: string } {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  })
    .formatToParts(date)
    .filter((dateItemObj) => accept.includes(dateItemObj.type))
    .reduce(
      (prev, dateItemObj) => ({
        ...prev,
        [dateItemObj.type]: dateItemObj.value,
      }),
      {}
    );
}

// {month:"October", year:"2020", day:"23", hour:"20",minute:"34", second:"10"}
