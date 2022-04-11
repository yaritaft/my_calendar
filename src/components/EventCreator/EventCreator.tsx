import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import Calendar from "react-calendar";
import { Event } from "../Day/Day";

import "react-calendar/dist/Calendar.css";

import "./EventCreator.css";

import { useEventCreator } from "../../hooks/Calendar/useEventCreator.hook";
import { eraseEvent, StoredEvents } from "../../actions/localStorage";
interface Properties {
  date: Date;
  onCancel: () => void;
  event?: Event;
  setStoredEvents?: (storedEvents: StoredEvents) => void;
  editMode: boolean;
}

export const EventCreator = ({
  date,
  onCancel,
  event,
  setStoredEvents,
}: Properties) => {
  const {
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
  } = useEventCreator({ date, onCancel, event });
  return (
    <form>
      <header>
        <input
          type="date"
          onChange={(e) => setDateSelected(new Date(e.target.value))}
          value={dateSelected.toISOString().substring(0, 10)}
        />
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
        {event && setStoredEvents && (
          <button onClick={() => eraseEvent(date, event, setStoredEvents)}>
            Delete
          </button>
        )}
      </footer>
    </form>
  );
};
