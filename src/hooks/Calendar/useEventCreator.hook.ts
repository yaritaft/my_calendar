import { useCallback, useState } from "react";
import { storeEvent } from "../../actions/localStorage";

interface Properties {
  date: Date;
  onCancel: () => void;
}

export const useEventCreator = ({ date, onCancel }: Properties) => {
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
  }, [title, dateSelected, from, to, description, onCancel]);
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
  };
};
