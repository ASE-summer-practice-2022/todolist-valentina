import React, { useEffect, useState } from "react";
import "./App.scss";
import AddPopup from "./components/AddPopup/AddPopup";
import EditPopup from "./components/EditPopup/EditPopup";
import Todo from "./components/Todo/Todo";
import { iTask } from "./dataStructures";
import { ReactComponent as StarsSvg } from "./imgs/stars.svg";

const initTask = { id: "", name: "", desc: "", dateIn: new Date(), dateOut: new Date(), completed: false };

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("todos") || "{}") || []);
  const [visible, setVisibility] = useState(false);
  const [task, setTask] = useState(initTask);

  const addTask = (data: iTask) => {
    if (data.name === "") return;

    const newTask = {
      id: `task-${Math.random().toString(16).slice(2)}`,
      name: data.name,
      dateIn: data.dateIn ?? false,
      dateOut: data.dateOut ?? false,
      desc: data.desc,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    console.log(id);
    const remainingTasks = tasks.filter((task: iTask) => id !== task.id);
    setTasks(remainingTasks);
  };

  const openPopup = () => {
    setVisibility(true);
  };

  const closePopup = () => {
    setVisibility(false);
  };

  const clearAll = () => {
    setTasks([]);
  };

  const toggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map((task: iTask) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (data: iTask) => {
    const id = tasks.findIndex((task: iTask) => task.id === data.id);
    const newTasks = [...tasks];
    newTasks[id] = data;
    setTasks(newTasks);
    setTask(initTask);
  };

  const taskList = tasks.map((task: iTask) => (
    <Todo
      id={task.id}
      name={task.name}
      dateIn={task.dateIn}
      dateOut={task.dateOut}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      key={task.id}
      setTask={(id: string) => setTask(tasks.find((task: iTask) => task.id === id))}
      deleteTask={deleteTask}
    />
  ));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
    console.log(JSON.parse(localStorage.getItem("todos") || "{}"));
  }, [tasks]);

  return (
    <div className="App">
      {visible && <AddPopup addTask={addTask} close={closePopup} />}
      {task.id && <EditPopup task={task} editTask={editTask} close={() => setTask(initTask)} />}
      <header className="App__Header">
        <div className="App__Header-Content">
          <div className="material-symbols-outlined App__Header-Add" onClick={openPopup}>
            add
          </div>
          <h1 className="App__Header-Head">СПИСОК ЗАДАЧ НА ПРАКТИКУ</h1>
          <StarsSvg className="App__Header-Clear" onClick={clearAll} />
        </div>
      </header>

      <main className="App__Content">
        <ul className="App__Content-Tasks">{taskList}</ul>
      </main>
    </div>
  );
}

export default App;
