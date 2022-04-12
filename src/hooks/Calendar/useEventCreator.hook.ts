import { useCallback, useState } from "react";
import { Event } from "../../components/Day/Day";
import {
  StoredEvents,
  storeEvent,
  updateEvent,
} from "../../actions/localStorage";

interface Properties {
  date: Date;
  onCancel: () => void;
  event?: Event;
}

export const useEventCreator = ({ date, onCancel, event }: Properties) => {
  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [from, setFrom] = useState(event?.from ?? "00:00");
  const [to, setTo] = useState(event?.to ?? "00:00");
  const [dateSelected, setDateSelected] = useState(date);
  const onSave = useCallback(() => {
    const fromParsed = Date.parse(`01/01/2011 ${from}`);
    const toParsed = Date.parse(`01/01/2011 ${to}`);
    if (fromParsed >= toParsed) {
      alert("From time cannot be later than to time.");
    } else {
      const eventToBeStored: Event = { from, to, title, description };
      storeEvent(dateSelected, eventToBeStored);
      onCancel();
    }
  }, [title, dateSelected, from, to, description, onCancel]);
  const onUpdate = useCallback(
    (setStoredEvents: (storedEvents: StoredEvents) => void) => {
      const fromParsed = Date.parse(`01/01/2011 ${from}`);
      const toParsed = Date.parse(`01/01/2011 ${to}`);
      if (fromParsed >= toParsed) {
        alert("From time cannot be later than to time.");
      } else if (event) {
        const eventToBeStored: Event = { from, to, title, description };
        updateEvent(date, event, eventToBeStored, setStoredEvents);
        onCancel();
      }
    },
    [title, dateSelected, from, to, description, date, event, onCancel]
  );
  return {
    title,
    setTitle,
    description,
    setDescription,
    from,
    setFrom,
    to,
    setTo,
    dateSelected,
    setDateSelected,
    onSave,
    onUpdate,
  };
};
