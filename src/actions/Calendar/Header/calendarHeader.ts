import moment from "moment";
import { generateDates } from "../../time";

export const goYearBack = (
  date: Date,
  setDate: (date: Date) => void,
  setDays: (dates: Date[]) => void
) => {
  const update = moment(date).subtract(1, "years").toDate();
  setDate(update);
  setDays(generateDates(update));
};
export const goMonthBack = (
  date: Date,
  setDate: (date: Date) => void,
  setDays: (dates: Date[]) => void
) => {
  const update = moment(date).subtract(1, "months").toDate();
  setDate(update);
  setDays(generateDates(update));
};
export const goMonthForward = (
  date: Date,
  setDate: (date: Date) => void,
  setDays: (dates: Date[]) => void
) => {
  const update = moment(date).add(1, "months").toDate();
  setDate(update);
  setDays(generateDates(update));
};
export const goYearForward = (
  date: Date,
  setDate: (date: Date) => void,
  setDays: (dates: Date[]) => void
) => {
  const update = moment(date).add(1, "years").toDate();
  setDate(update);
  setDays(generateDates(update));
};
