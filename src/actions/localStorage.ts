import { Event } from "../components/Day/Day";

export interface StoredEvents {
  [date: string]: Event[];
}

export const storeEvent = (
  date: Date,
  { from, to, title, description, color, id }: Event
) => {
  const stringDate = date.toISOString().substring(0, 10);
  const storedEvents =
    JSON.parse(localStorage.getItem("storedEvents")!) === null
      ? {}
      : JSON.parse(localStorage.getItem("storedEvents")!);
  storedEvents[stringDate] = [
    ...(storedEvents?.[stringDate] || []),
    { title, from, to, description, color, id: id ?? crypto.randomUUID() },
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

export const updateEvent = (
  rawDate: Date,
  eventToBeRemoved: Event,
  eventUpdated: Event,
  setStoredEvents: (storedEvents: StoredEvents) => void
) => {
  eraseEvent(rawDate, eventToBeRemoved, setStoredEvents);
  storeEvent(rawDate, eventUpdated);
};
