import moment from "moment";

const getDaysArray = (start: Date, end: Date): Date[] => {
  const arr: Date[] = [];
  for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const daysBefore: { [key: string]: number } = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

const daysMonth = (date: Date): Date[] => {
  return getDaysArray(firstDayOfMonth(date), lastDayOfMonth(date));
};

const dayOfWeek = (date: Date): keyof typeof daysBefore => {
  return date.toLocaleDateString("ISO", { weekday: "long" }).toLowerCase(); // STRING DOES NOT RECOGNIZE KEYS AS VALID ONES
};

const firstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
const lastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const dateMove = (
  date: Date,
  numberOfDays: number,
  direction: "back" | "forward"
): Date => {
  return direction === "back"
    ? // @ts-ignore
      new Date(moment(date).subtract(numberOfDays, "days"))
    : // @ts-ignore
      new Date(moment(date).add(numberOfDays, "days"));
};

const daysMonthBefore = (date: Date): Date[] => {
  const firstDateMonth = firstDayOfMonth(date);
  const dayOfTheWeek = dayOfWeek(firstDateMonth);
  const dateBefore = dateMove(firstDateMonth, daysBefore[dayOfTheWeek], "back");
  const daysBack = getDaysArray(
    dateBefore,
    dateMove(firstDateMonth, 1, "back")
  );
  return daysBack;
};

const daysMonthAfter = (date: Date): Date[] => {
  const daysBefore = daysMonthBefore(date).length;
  const daysOfTheMonth = lastDayOfMonth(date).getDate();
  const diff = 35 - daysBefore - daysOfTheMonth;
  const dateAfter = dateMove(lastDayOfMonth(date), diff, "forward");
  const firstDayOfNextMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );
  const daysAfterMonth = getDaysArray(firstDayOfNextMonth, dateAfter);
  return daysAfterMonth;
};

export const generateDates = (date: Date): Date[] => [
  ...daysMonthBefore(date),
  ...daysMonth(date),
  ...daysMonthAfter(date),
];
