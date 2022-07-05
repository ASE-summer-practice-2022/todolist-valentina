import classnames from "classnames";
import { useContext, useEffect } from "react";
import styles from "./app.module.scss";
import { ReactComponent as StarsSvg } from "./assets/imgs/stars.svg";
import Popup from "./components/Popup";
import Todo from "./components/Todo";
import { TASK_STATE } from "./constants";
import { TaskContext } from "./helpers/globalState";
import { ITask } from "./types/core";



function App() {
  const { tasks, currentId, dispatch } = useContext(TaskContext);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const taskList = tasks.map((task: ITask) => <Todo key={task.id} {...task} />);

  const openPopup = () => dispatch({ type: TASK_STATE.SET_CURRENT_ID, payload: 0 });
  const clearTasks = () => dispatch({ type: TASK_STATE.CLEAR_TASKS });

  return (
    <div className={styles.app}>
      {currentId !== -1 && <Popup />}
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

export default App;
