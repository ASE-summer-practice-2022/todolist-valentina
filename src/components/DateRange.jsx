import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function DateRange(props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onChange = (date) => {
    props.onChange(date);
    setIsHovering(false);
  }

  return (
    <div className="DateRange">
      <div
        className="material-symbols-outlined DateRange__Icon"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        {isHovering &&
          <Calendar
          className="DateRange__Calendar"
          onChange={onChange}
          value={props.date}
          />}
        date_range
      </div>
      {props.date && <div className="DateRange__Date">{new Date(props.date).toLocaleDateString("ru-RU")}</div>}
    </div>
  )
}