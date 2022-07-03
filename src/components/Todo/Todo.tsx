import classnames from "classnames";
import { useContext, useState } from "react";
import { EDIT_TASK, REMOVE_TASK, SET_CURRENT_ID } from "../../actions/constants";
import { TaskContext } from "../../helpers/GlobalState";
import { iTask } from "../../types";
import "./Todo.scss";

interface iTodoProps {
  id: string;
  name: string;
  dateIn: string | Date;
  dateOut: string | Date;
  completed: boolean;
}

function Todo({ id, name, dateIn, dateOut, completed }: iTodoProps) {
  const { tasks, dispatch } = useContext(TaskContext);
  const [fade, setFade] = useState(false);

  const toggleTaskCompleted = (id: string) => {
    const updatedTask = { ...tasks.find((task: iTask) => id === task.id)! };
    updatedTask.completed = !updatedTask.completed;
    dispatch({ type: EDIT_TASK, payload: updatedTask });
  };

  return (
    <li
      className={classnames("Task", completed && "Task_Completed", fade && "Task_Fade")}
      onAnimationEnd={() => fade && dispatch({ type: REMOVE_TASK, payload: id })}
    >
      <input
        className="Task__Chb"
        type="checkbox"
        defaultChecked={completed}
        onChange={() => toggleTaskCompleted(id)}
      />
      <div className="Task__Dates">
        <div className="Task__Datein">Дата выдачи: {new Date(dateIn).toLocaleDateString("ru-RU")}</div>
        <div className="Task__Dateout">Дата сдачи: {new Date(dateOut).toLocaleDateString("ru-RU")}</div>
      </div>
      <div className="Task__Subject">{name}</div>
      <button
        className={classnames("Btn", completed && "Btn_Completed")}
        onClick={() => dispatch({ type: SET_CURRENT_ID, payload: id })}
      >
        Открыть
      </button>
      <button className={classnames("Btn Task__Del", completed && "Btn_Completed")} onClick={() => setFade(true)}>
        Удалить
      </button>
    </li>
  );
}

export default Todo;
