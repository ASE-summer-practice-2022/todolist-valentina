import React, { useState } from "react";
import "./Todo.scss";

interface iTodoProps {
  id: string;
  name: string;
  completed: boolean;
  dateIn?: string | Date;
  dateOut?: string | Date;
  deleteTask: any;
  setTask: any;
  toggleTaskCompleted: any;
}

function Todo(props: iTodoProps) {
  const [fade, setFade] = useState(false)

  return (
    <li
      className={`Task${props.completed ? " Task_Completed": ""}${fade ? " Task_Fade" : ""}`}
      onAnimationEnd={() => fade && props.deleteTask(props.id)}
    >
      <input
        className="Task__Chb"
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      <div className="Task__Dates">
        {props.dateIn && (
          <div className="Task__Datein">Дата выдачи: {new Date(props.dateIn).toLocaleDateString("ru-RU")}</div>
        )}
        {props.dateOut && (
          <div className="Task__Dateout">Дата сдачи: {new Date(props.dateOut).toLocaleDateString("ru-RU")}</div>
        )}
      </div>
      <div className="Task__Subject">{props.name}</div>
      <button className={`Btn${props.completed ? " Btn_Completed" : ""}`} onClick={() => props.setTask(props.id)}>
        Открыть
      </button>
      <button
        className={`Btn Task__Del${props.completed ? " Btn_Completed" : ""}`}
        onClick={() => setFade(true)}
      >
        Удалить
      </button>
    </li>
  );
}

export default Todo;
