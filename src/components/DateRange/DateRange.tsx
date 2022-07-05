import classnames from "classnames";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { parseDate } from "../../helpers/date";
import styles from "./dateRange.module.scss";

interface IDateRangeProps {
  date: string | Date;
  name: string;
  onChange: any;
}

function DateRange({ date, name, onChange }: IDateRangeProps) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => setIsHover(true);
  const handleMouseOut = () => setIsHover(false);
  const handleChange = (value: Date) => {
    const e = {
      target: {
        value,
        name,
      },
    };
    onChange(e);
    setIsHover(false);
  };

  return (
    <div className={styles.dateRange}>
      <div className={styles.date}>{parseDate(date)}</div>
      <div
        className={classnames(styles.icon, styles.materialSymbols)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHover && <Calendar className={styles.calendar} onChange={handleChange} value={new Date(date)} />}
        date_range
      </div>
    </div>
  );
}

export default DateRange;
