import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { parseDate, today, tomorrow } from "../../helpers/date";
import { useForm } from "../../hooks/useForm";
import { useStore } from "../../hooks/useStore";
import Button from "../Button";
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
          <Button type="submit">{todoStore.currentId ? "Сохранить" : "Создать"}</Button>
          <Button type="button" onClick={close}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}

export default observer(Popup);
