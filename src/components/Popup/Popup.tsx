import classnames from "classnames";
import React, { useContext } from "react";
import { TASK_STATE } from "../../constants";
import { parseDate, today, tomorrow } from "../../helpers/date";
import { TaskContext } from "../../helpers/globalState";
import { useForm } from "../../hooks/useForm";
import Button from "../Button";
import DateRange from "../DateRange";
import styles from "./popup.module.scss";

function Popup() {
  const { tasks, currentId, dispatch } = useContext(TaskContext);
  const initialState = tasks.find((task) => task.id === currentId) || {
    dateIn: today,
    dateOut: tomorrow,
  };
  const [values, setValues] = useForm(initialState);

  const close = () => dispatch({ type: TASK_STATE.SET_CURRENT_ID, payload: -1 });
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.name) {
      dispatch({ type: currentId ? TASK_STATE.EDIT_TASK : TASK_STATE.ADD_TASK, payload: values });
      close();
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.overlay} onClick={close}></div>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.body}>
          <div className={styles.row}>
            <div className={styles.key}>Дата выдачи:</div>
            <DateRange onChange={setValues} name="dateIn" date={parseDate(values.dateIn)} />
          </div>
          <div className={styles.row}>
            <div className={styles.key}>Дата сдачи:</div>
            <DateRange onChange={setValues} name="dateOut" date={parseDate(values.dateOut)} />
          </div>
          <div className={styles.row}>
            <div className={styles.key}>Тема:</div>
            <input
              type="text"
              className={styles.input}
              name="name"
              autoComplete="off"
              value={values.name}
              onChange={setValues}
            />
          </div>
          <div className={classnames(styles.row, styles.desc)}>
            <div className={styles.key}>Описание:</div>
            <textarea
              className={styles.input}
              name="desc"
              autoComplete="off"
              value={values.desc}
              onChange={setValues}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button type="submit">{currentId ? "Сохранить" : "Создать"}</Button>
          <Button type="button" onClick={close}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Popup;
