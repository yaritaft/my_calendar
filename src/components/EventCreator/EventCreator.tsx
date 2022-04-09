import { useCallback, useState } from "react";
import { Event, StoredEvents } from "../Event/Event";

interface Properties {
  date: Date;
  onCancel: () => void;
}

const storeEvent = (
  date: Date,
  from: string,
  to: string,
  title: string,
  description: string
) => {
  const today = date.toISOString().substring(0, 10);
  const storedEvents =
    JSON.parse(localStorage.getItem("storedEvents")!) === null
      ? {}
      : JSON.parse(localStorage.getItem("storedEvents")!);
  storedEvents[today] = [
    ...(storedEvents?.[today] || []),
    { title, from, to, description, id: crypto.randomUUID() },
  ];
  const toStore = JSON.stringify(storedEvents);
  localStorage.setItem("storedEvents", toStore);
};

export const eraseEvent = (
  rawDate: Date,
  eventToBeRemoved: Event,
  setStoredEvents: (storedEvents: StoredEvents) => void
) => {
  const date = rawDate.toISOString().substring(0, 10);
  const storedEvents =
    JSON.parse(localStorage.getItem("storedEvents")!) === null
      ? {}
      : JSON.parse(localStorage.getItem("storedEvents")!);
  const dayEvents = storedEvents?.[date];
  const updatedDayEvents = dayEvents.filter(
    (e: Event) => e.id !== eventToBeRemoved.id
  );
  storedEvents[date] = updatedDayEvents;
  const toStore = JSON.stringify(storedEvents);
  localStorage.setItem("storedEvents", toStore);
  setStoredEvents(storedEvents);
};

export const EventCreator = ({ date, onCancel }: Properties) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("00:00");
  const [to, setTo] = useState("00:00");
  const [dateSelected, setDateSelected] = useState(date);
  const onSave = useCallback(() => {
    const fromParsed = Date.parse(`01/01/2011 ${from}`);
    const toParsed = Date.parse(`01/01/2011 ${to}`);
    if (fromParsed >= toParsed) {
      alert("From time cannot be later than to time.");
    } else {
      storeEvent(dateSelected, from, to, title, description);
      onCancel();
    }
  }, [title, dateSelected, from, to]);
  return (
    <form>
      <header>
        <input
          type="date"
          onChange={(e) => setDateSelected(new Date(e.target.value))}
          value={dateSelected.toISOString().substring(0, 10)}
        ></input>
      </header>
      <div className="formItem">
        <label>Title </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="time-range-picker">
        <div className="formItem">
          <label>From</label>
          <input
            type="time"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label>To</label>
          <input
            type="time"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>
      <div className="formItem">
        <label>Description </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <footer>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSave}>Save</button>
      </footer>
    </form>
  );
};
