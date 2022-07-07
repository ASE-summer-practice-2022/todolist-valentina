import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import Task from "../models/Task";

class TodoStore {
  todos: Task[];

  currentId: number | string;

  constructor() {
    makeAutoObservable(this);
    this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    this.currentId = -1;
  }

  addTodo = (todo: Task) => {
    this.todos.push({ ...todo, id: uuidv4(), completed: false });
  };

  deleteTodo = (id: string) => {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = updatedTodos;
  };

  updateTodo = (updatedTodo: Task) => {
    const updateTodos = this.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
    this.todos = updateTodos;
  };

  toggleCompleted = (id: string) => {
    const updatedTodo = this.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    this.todos = updatedTodo;
  };

  clearTasks = () => {
    this.todos = [];
  };

  setCurrentId = (id: number | string) => {
    this.currentId = id;
  };
}

export default TodoStore;