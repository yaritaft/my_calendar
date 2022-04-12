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

const validateDates = (from: string, to: string) => {
  const fromParsed = Date.parse(`01/01/2011 ${from}`);
  const toParsed = Date.parse(`01/01/2011 ${to}`);
  if (fromParsed >= toParsed) {
    alert("From time cannot be later than to time.");
  }
  return !(fromParsed >= toParsed);
};

const validateTitle = (title: string) => {
  if (title.length > 30) {
    alert("Please enter a title with less than 30 characters.");
  }
  return !(title.length > 30);
};

export const useEventCreator = ({ date, onCancel, event }: Properties) => {
  const [title, setTitle] = useState(event?.title ?? "");
  const [color, setColor] = useState(event?.color ?? "blue");
  const [description, setDescription] = useState(event?.description ?? "");
  const [from, setFrom] = useState(event?.from ?? "00:00");
  const [to, setTo] = useState(event?.to ?? "00:00");
  const [dateSelected, setDateSelected] = useState(date);
  const onSave = useCallback(() => {
    if (validateDates(from, to) && validateTitle(title)) {
      const eventToBeStored: Event = { from, to, title, description, color };
      storeEvent(dateSelected, eventToBeStored);
      onCancel();
    }
  }, [title, dateSelected, from, to, description, color, onCancel]);
  const onUpdate = useCallback(
    (setStoredEvents: (storedEvents: StoredEvents) => void) => {
      if (validateDates(from, to) && validateTitle(title) && event) {
        const eventToBeStored: Event = { from, to, title, description, color };
        updateEvent(date, event, eventToBeStored, setStoredEvents);
        onCancel();
      }
    },
    [title, from, to, description, date, event, color, onCancel]
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
    color,
    setColor,
  };
};
