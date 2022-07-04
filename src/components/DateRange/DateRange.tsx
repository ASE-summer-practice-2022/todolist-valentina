import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateRange.scss";

interface iDateRangeProps {
  date: Date;
  name: string;
  onChange: any;
}

function DateRange({ date, name, onChange }: iDateRangeProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleChange = (value: Date) => {
    const e = {
      target: {
        value,
        name,
      },
    };
    onChange(e);
    setIsHovering(false);
  };

  return (
    <div className="DateRange">
      <div
        className="material-symbols-outlined DateRange__Icon"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering && <Calendar className="DateRange__Calendar" onChange={handleChange} value={date} />}
        date_range
      </div>
      <div className="DateRange__Date">{new Date(date).toLocaleDateString("ru-RU")}</div>
    </div>
  );
}

export default DateRange;
