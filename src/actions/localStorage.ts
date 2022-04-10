import { Event } from "../components/Event/Event";

export interface StoredEvents {
  [date: string]: Event[];
}

export const storeEvent = (
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
