import React, { useEffect, useState } from "react";
import './App.css';
import EditPopup from './components/EditPopup';
import Popup from './components/Popup';
import Todo from './components/Todo';
import { ReactComponent as StarsSvg } from './imgs/stars.svg';
import './reset.css';


function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [visible, setVisibility] = useState(false);
  const [task, setTask] = useState(false);

  const addTask = (data) => {
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

  const deleteTask = (id) => {
    console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const openPopup = () => {
    setVisibility(true)
  }

  const closePopup = () => {
    setVisibility(false)
  }

  const clearAll = () => {
    setTasks([])
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (data) => {
    const id = tasks.findIndex(task => task.id === data.id)
    const newTasks = [...tasks]
    newTasks[id] = data
    setTasks(newTasks)
    setTask(false)
  }

  const taskList = tasks
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        dateIn={task.dateIn}
        dateOut={task.dateOut}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        key={task.id}
        setTask={(id) => setTask(tasks.find(task => task.id === id))}
        deleteTask={deleteTask}
      />
    ));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
    console.log(JSON.parse(localStorage.getItem("todos")));
  }, [tasks]);

  return (
    <div className="App">
      {visible && <Popup addTask={addTask} close={closePopup} />}
      {task && <EditPopup task={task} editTask={editTask} close={() => setTask(false)} />}
      <header className="App__Header">
        <div className="App__Header-Content">
          <div className="material-symbols-outlined App__Header-Add" onClick={openPopup}>add</div>
          <h1 className="App__Header-Head">СПИСОК ЗАДАЧ НА ПРАКТИКУ</h1>
          <StarsSvg className="App__Header-Clear" onClick={clearAll} />
        </div>
      </header>

      <main className="App__Content">
        <ul className="App__Content-Tasks">
          {taskList}
        </ul>
      </main>
    </div>
  );
}

export default App;
