import { Button, TextField } from "@mui/material";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { today, tomorrow } from "../../helpers/date";
import { useForm } from "../../hooks/useForm";
import { useStore } from "../../hooks/useStore";
import DateRange from "../DateRange";
import styles from "./popup.module.scss";

function Popup() {
  const { todoStore } = useStore();
  const initialState = todoStore.todos.find((task) => task.id === todoStore.currentId) || {
    dateIn: today,
    dateOut: tomorrow,
  };
  const [values, setValues] = useForm(initialState);

  const close = () => todoStore.setCurrentId(-1);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.name) {
      if (todoStore.currentId) todoStore.updateTodo(values);
      else todoStore.addTodo(values);
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
            <DateRange onChange={setValues} name="dateIn" date={values.dateIn} />
          </div>
          <div className={styles.row}>
            <div className={styles.key}>Дата сдачи:</div>
            <DateRange onChange={setValues} name="dateOut" date={values.dateOut} />
          </div>
          <div className={styles.row}>
            <div className={styles.key}>Тема:</div>
            <TextField className={styles.textInput} name="name" value={values.name} onChange={setValues} />
          </div>
          <div className={classnames(styles.row, styles.desc)}>
            <div className={styles.key}>Описание:</div>
            <TextField className={styles.textInput} name="desc" value={values.desc} onChange={setValues} multiline />
          </div>
        </div>
        <div className={styles.footer}>
          <Button className={styles.btn} type="submit">
            {todoStore.currentId ? "Сохранить" : "Создать"}
          </Button>
          <Button className={styles.btn} type="button" onClick={close}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}

export default observer(Popup);
