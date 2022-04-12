import { useState } from "react";
import Popup from "react-modal";

import "./Calendar.css";
import { Day } from "../Day/Day";
import { EventCreator } from "../EventCreator/EventCreator";
import { daysBefore, generateDates } from "../../actions/time";
import { capitalizeFirstLetter } from "../../actions/string";
import { CalendarHeader } from "./Header/CalendarHeader";
import { StoredEvents } from "../../actions/localStorage";
import { customStylesCreateEventPopUp } from "./customStylesPopUp";
import useDeepCompareEffect from "use-deep-compare-effect";

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState(generateDates(date));
  const [storedEvents, setStoredEvents] = useState<StoredEvents>({});
  useDeepCompareEffect(() => {
    setStoredEvents(JSON.parse(localStorage.getItem("storedEvents")!));
  }, [storedEvents]);

  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const openModal = (date: Date, closeModal: () => void) => {
    setIsOpenPopUp(true);
    return (
      <Popup
        isOpen={isOpenPopUp}
        className="popup"
        style={customStylesCreateEventPopUp}
        onRequestClose={closeModal}
      >
        <EventCreator date={date} onCancel={closeModal} editMode={false} />
      </Popup>
    );
  };

  return (
    <div>
      <CalendarHeader date={date} setDate={setDate} setDays={setDays} />
      <div className="dayNamesRow">
        <div className="dayNames">
          {Object.keys(daysBefore).map((day) => (
            <div>{capitalizeFirstLetter(day)}</div>
          ))}
        </div>
      </div>
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
      </div>
    </div>
  );
};
