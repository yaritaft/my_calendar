import {
  goMonthBack,
  goMonthForward,
  goYearBack,
  goYearForward,
} from "../../../actions/Calendar/Header/calendarHeader";

interface Ṕroperties {
  date: Date;
  setDate: (date: Date) => void;
  setDays: (dates: Date[]) => void;
}

export const CalendarHeader = ({ date, setDate, setDays }: Ṕroperties) => {
  return (
    <div className="calendar-header">
      <button
        onClick={() => {
          goYearBack(date, setDate, setDays);
        }}
      >
        {"<<"}
      </button>
      <button
        onClick={() => {
          goMonthBack(date, setDate, setDays);
        }}
      >
        {"<"}
      </button>
      <div>{date.toISOString().substring(0, 7)}</div>
      <button
        onClick={() => {
          goMonthForward(date, setDate, setDays);
        }}
      >
        {">"}
      </button>
      <button
        onClick={() => {
          goYearForward(date, setDate, setDays);
        }}
      >
        {">>"}
      </button>
    </div>
  );
};
