import { useState } from "react";
import Popup from "react-modal";
import { eraseEvent, StoredEvents } from "../../actions/localStorage";
import { Event } from "../Day/Day";
import "./EventDetails.css";
import { customStylesEventDetails } from "./eventDetailsPopUpCustomStyles";

interface Properties {
  event: Event;
  date: Date;
  setStoredEvents: (storedEvents: StoredEvents) => void;
}

export const EventDetails = ({ event, date, setStoredEvents }: Properties) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)}>{event.title}</div>
      <Popup
        isOpen={open}
        className="popup-event-details"
        style={customStylesEventDetails}
      >
        <header>{date.toISOString().substring(0, 10)}</header>
        <div>
          <div>Title: {event.title}</div>
          <div>Description: {event.description}</div>
          <div>From: {event.from} HS</div>
          <div>To: {event.to} HS</div>
        </div>
        <footer>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => eraseEvent(date, event, setStoredEvents)}>
            Delete
          </button>
        </footer>
      </Popup>
    </>
  );
};
