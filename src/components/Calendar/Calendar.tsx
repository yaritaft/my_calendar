import { useEffect, useState } from "react";
import "./Calendar.css";
import { Day } from "../Day/Day";
import Popup from "react-modal";

import { EventCreator } from "../EventCreator/EventCreator";
import { daysBefore, generateDates } from "../../actions/time";
import { capitalizeFirstLetter } from "../../actions/string";
import { CalendarHeader } from "./Header/CalendarHeader";
import { StoredEvents } from "../../actions/localStorage";

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
    height: "500px",
    width: "500px",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: "1em",
    boxShadow: "5px 5px 5px black",
  },
};

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState(generateDates(date));
  const [storedEvents, setStoredEvents] = useState<StoredEvents>({});
  useEffect(() => {
    setStoredEvents(JSON.parse(localStorage.getItem("storedEvents")!));
  }, [JSON.stringify(storedEvents)]); // TODO: IMPROVE THIS BECAUSE OBJECT IS NOT ORDERED

  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const openModal = (date: Date, closeModal: () => void) => {
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
