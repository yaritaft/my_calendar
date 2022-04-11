import "./Day.css";
import { useState } from "react";
import { EventDetails } from "../EventDetails/EventDetails";
import { StoredEvents } from "../../actions/localStorage";
export interface Event {
  id?: string;
  title: string;
  from: string;
  to: string;
  description: string;
}

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
          <div key={event.id} className="event">
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
