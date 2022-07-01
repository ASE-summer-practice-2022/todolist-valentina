import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateRange.scss";

interface iDateRangeProps {
  date: Date;
  onChange: any;
}

function DateRange(props: iDateRangeProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onChange = (date: Date) => {
    props.onChange(date);
    setIsHovering(false);
  };

  return (
    <div className="DateRange">
      <div
        className="material-symbols-outlined DateRange__Icon"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering && <Calendar className="DateRange__Calendar" onChange={onChange} value={props.date} />}
        date_range
      </div>
      {props.date && <div className="DateRange__Date">{new Date(props.date).toLocaleDateString("ru-RU")}</div>}
    </div>
  );
}

export default DateRange;
