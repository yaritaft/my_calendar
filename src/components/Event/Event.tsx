export interface Event {
  id: string;
  title: string;
  from: string;
  to: string;
  description: string;
}

interface Properties extends Event {}

export const Day = ({ title, from, to }: Properties) => {
  return <div className="event"></div>;
};
