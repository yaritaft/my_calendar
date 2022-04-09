export interface Event {
  id: string;
  title: string;
  from: string;
  to: string;
  description: string;
}

export interface StoredEvents {
  [date: string]: Event[];
}

interface Properties extends Event {}

export const Day = ({ title, from, to }: Properties) => {
  return <div className="event"></div>;
};
