import { useState } from "react";
import Popup from "react-modal";
import { eraseEvent, StoredEvents } from "../../actions/localStorage";
import { Event } from "../Day/Day";
import { EventCreator } from "../EventCreator/EventCreator";
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
        <EventCreator
          event={event}
          date={date}
          setStoredEvents={setStoredEvents}
          editMode={true}
          onCancel={() => setOpen(false)}
        />
      </Popup>
    </>
  );
};
