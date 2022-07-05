import { Button, Checkbox } from "@mui/material";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { parseDate } from "../../helpers/date";
import { useStore } from "../../hooks/useStore";
import styles from "./todo.module.scss";

interface TaskProps {
  id: string;
  name: string;
  dateIn: string | Date;
  dateOut: string | Date;
  completed: boolean;
}

function Todo({ id, name, dateIn, dateOut, completed }: TaskProps) {
  const { todoStore } = useStore();
  const [fade, setFade] = useState(false);

  const toggleChb = () => todoStore.toggleCompleted(id);
  const openPopup = () => todoStore.setCurrentId(id);
  const rmTodo = () => fade && todoStore.deleteTodo(id);
  const runRmAnim = () => setFade(true);

  return (
    <li className={classnames(styles.task, completed && styles.completed, fade && styles.fade)} onAnimationEnd={rmTodo}>
      <Checkbox className={styles.checkbox} defaultChecked={completed} onChange={toggleChb} />
      <div className={styles.dates}>
        <div>Дата выдачи: {parseDate(dateIn)}</div>
        <div>Дата сдачи: {parseDate(dateOut)}</div>
      </div>
      <div className={styles.subject}>{name}</div>

      <Button className={classnames(styles.btn, completed && styles.completed)} type="submit" onClick={openPopup}>
        Открыть
      </Button>
      <Button className={classnames(styles.btn, completed && styles.completed)} type="button" onClick={runRmAnim}>
        Удалить
      </Button>
    </li>
  );
}

export default observer(Todo);
