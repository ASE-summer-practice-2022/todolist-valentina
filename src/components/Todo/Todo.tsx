import classnames from "classnames";
import { useContext, useState } from "react";
import { TASK_STATE } from "../../constants";
import { parseDate } from "../../helpers/date";
import { TaskContext } from "../../helpers/globalState";
import Button from "../Button";
import styles from "./todo.module.scss";

interface ITodoProps {
  id: string;
  name: string;
  dateIn: string | Date;
  dateOut: string | Date;
  completed: boolean;
}

function Todo({ id, name, dateIn, dateOut, completed }: ITodoProps) {
  const { dispatch } = useContext(TaskContext);
  const [fade, setFade] = useState(false);

  const toggleChb = () => dispatch({ type: TASK_STATE.TOGGLE_TASK_COMPLETED, payload: id });
  const openPopup = () => dispatch({ type: TASK_STATE.SET_CURRENT_ID, payload: id });
  const rmTodo = () => fade && dispatch({ type: TASK_STATE.REMOVE_TASK, payload: id });
  const runRmAnim = () => setFade(true);

  return (
    <li className={classnames(styles.task, completed && styles.completed, fade && styles.fade)} onAnimationEnd={rmTodo}>
      <input className={styles.chb} type="checkbox" defaultChecked={completed} onChange={toggleChb} />
      <div className={styles.dates}>
        <div className={styles.datein}>Дата выдачи: {parseDate(dateIn)}</div>
        <div className={styles.dateout}>Дата сдачи: {parseDate(dateOut)}</div>
      </div>
      <div className={styles.subject}>{name}</div>

      <Button completed={completed} type="submit" onClick={openPopup}>
        Открыть
      </Button>
      <Button completed={completed} type="button" onClick={runRmAnim}>
        Удалить
      </Button>
    </li>
  );
}

export default Todo;
