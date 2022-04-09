import { useEffect, useState } from "react";
import "./Calendar.css";
import moment from "moment";
import { Day } from "./Day/Day";
import Popup from "react-modal";

import { StoredEvents } from "./Event/Event";
import { EventCreator } from "./EventCreator/EventCreator";

const getDaysArray = (start: Date, end: Date): Date[] => {
  const arr: Date[] = [];
  for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

const daysBefore: { [key: string]: number } = {
  // TODO: FIX THIS SIGNATURE LATER
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "auto",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([
    ...daysMonthBefore(date),
    ...daysMonth(date),
    ...daysMonthAfter(date),
  ]);
  const [storedEvents, setStoredEvents] = useState<StoredEvents>({});
  useEffect(() => {
    setStoredEvents(JSON.parse(localStorage.getItem("storedEvents")!));
  }, [JSON.stringify(storedEvents)]); // TODO: IMPROVE THIS BECAUSE OBJECT IS NOT ORDERED

  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  function openModal(date: Date, closeModal: () => void) {
    setIsOpenPopUp(true);
    return (
      <Popup
        isOpen={isOpenPopUp}
        className="popup"
        style={customStyles}
        onRequestClose={closeModal}
      >
        <EventCreator date={date} onCancel={closeModal} />
      </Popup>
    );
  }

  return (
    <div className="calendar">
      <div className="parent">
        {days.map((day) => (
          <Day
            key={day.toISOString()}
            day={day}
            openModal={openModal}
            events={storedEvents?.[day.toISOString().substring(0, 10)]}
            setStoredEvents={setStoredEvents}
          />
        ))}
      </div>
      {/* <button onClick={openModal}>ADD</button> */}
    </div>
  );
};