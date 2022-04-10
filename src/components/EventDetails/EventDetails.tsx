import { useState } from "react";
import Popup from "react-modal";
import { eraseEvent, StoredEvents } from "../../actions/localStorage";
import { Event } from "../Event/Event";
import "./EventDetails.css";

interface Properties {
  event: Event;
  date: Date;
  setStoredEvents: (storedEvents: StoredEvents) => void;
}

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
    border: "1px solid black",
  },
};

export const EventDetails = ({ event, date, setStoredEvents }: Properties) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)}>{event.title}</div>
      <Popup isOpen={open} className="popup-event-details" style={customStyles}>
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
