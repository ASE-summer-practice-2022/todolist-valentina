import classnames from "classnames";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styles from "./app.module.scss";
import { ReactComponent as StarsSvg } from "./assets/imgs/stars.svg";
import Popup from "./components/Popup";
import Todo from "./components/Todo";
import { useStore } from "./hooks/useStore";
import { Task } from "./models/Task";

function App() {
  const { todoStore } = useStore();

  useEffect(() => {
    autorun(() => localStorage.setItem("todos", JSON.stringify(todoStore.todos)));
  }, [todoStore.todos]);

  const taskList = todoStore.todos.map((task: Task) => <Todo key={task.id} {...task} />);

  const openPopup = () => todoStore.setCurrentId(0);
  const clearTasks = () => todoStore.clearTasks();

  return (
    <div className={styles.app}>
      {todoStore.currentId !== -1 && <Popup />}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={classnames(styles.materialSymbols, styles.headerCreate)} onClick={openPopup}>
            add
          </div>
          <h1 className={styles.headerHead}>СПИСОК ЗАДАЧ НА ПРАКТИКУ</h1>
          <StarsSvg className={styles.headerClear} onClick={clearTasks} />
        </div>
      </header>

      <main className={styles.content}>
        <ul className={styles.contentTasks}>{taskList}</ul>
      </main>
    </div>
  );
}

export default observer(App);
