import "./Day.css";
import { Event, StoredEvents } from "../Event/Event";
import { useState } from "react";
import { eraseEvent } from "../EventCreator/EventCreator";
import { EventDetails } from "../EventDetails/EventDetails";

interface Properties {
  events?: Event[];
  day: Date;
  openModal: (date: Date, closeModal: () => void) => JSX.Element;
  setStoredEvents: (storedEvents: StoredEvents) => void;
}

export const Day = ({
  day,
  events,
  openModal,
  setStoredEvents,
}: Properties) => {
  const dayNumber = String(day.getDate());
  const [clicked, setClicked] = useState(false);
  return (
    <div className="day">
      <header>
        <div className="number-of-day">
          {dayNumber.length === 1 ? `0${dayNumber}` : dayNumber}
        </div>
        <div className="add-event" onClick={() => setClicked(true)}>
          {clicked && openModal(day, () => setClicked(false))}+
        </div>
      </header>
      <div className="events">
        {events?.map((event) => (
          <div
            key={event.id}
            // onClick={() => eraseEvent(day, event, setStoredEvents)}
            className="event"
          >
            <EventDetails
              event={event}
              date={day}
              setStoredEvents={setStoredEvents}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
