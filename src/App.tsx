import { useContext, useEffect } from "react";
import "./App.scss";
import { ReactComponent as StarsSvg } from "./assets/imgs/stars.svg";
import Popup from "./components/Popup/Popup";
import Todo from "./components/Todo/Todo";
import { CLEAR_TASKS, SET_CURRENT_ID } from "./constants";
import { TaskContext } from "./helpers/GlobalState";
import { iTask } from "./types";

function App() {
  const { tasks, currentId, dispatch } = useContext(TaskContext);
  const taskList = tasks.map((task: iTask) => <Todo key={task.id} {...task} />);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      {currentId !== -1 && <Popup />}
      <header className="App__Header">
        <div className="App__Header-Content">
          <div
            className="material-symbols-outlined App__Header-Create"
            onClick={() => dispatch({ type: SET_CURRENT_ID, payload: 0 })}
          >
            add
          </div>
          <h1 className="App__Header-Head">СПИСОК ЗАДАЧ НА ПРАКТИКУ</h1>
          <StarsSvg className="App__Header-Clear" onClick={() => dispatch({ type: CLEAR_TASKS })} />
        </div>
      </header>

      <main className="App__Content">
        <ul className="App__Content-Tasks">{taskList}</ul>
      </main>
    </div>
  );
}

export default App;
