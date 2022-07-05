import { action, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { ITodo } from "../models/core";

export class TodoStore {
  @observable todos: ITodo[];
  @observable currentId: number | string;

  constructor() {
    makeObservable(this);
    this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    this.currentId = -1;
  }

  @action addTodo = (todo: ITodo) => {
    this.todos.push({ ...todo, id: uuidv4(), completed: false });
  };
  @action deleteTodo = (id: string) => {
    const updatedTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = updatedTodos;
  };
  @action updateTodo = (updatedTodo: ITodo) => {
    const updateTodos = this.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
    this.todos = updateTodos;
  };
  @action toggleCompleted = (id: string) => {
    const updatedTodo = this.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    this.todos = updatedTodo;
  };
  @action clearTasks = () => {
    this.todos = [];
  };
  @action setCurrentId = (id: number | string) => {
    this.currentId = id;
  };
}
