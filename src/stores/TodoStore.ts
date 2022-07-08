import { makeAutoObservable, observable, ObservableMap } from "mobx";

import Todo, { ITodo } from "../models/Todo";

class TodoStore {
  private _todos: ObservableMap<string, Todo>;

  currentId: number | string;

  get todos() {
    return Array.from(this._todos.values());
  }

  get currentTodo() {
    return this._todos.get(String(this.currentId));
  }

  constructor() {
    makeAutoObservable(this);

    this._todos = observable.map<string, Todo>(
      JSON.parse(localStorage.getItem("todos") || "[]").map((todo: Todo) => [todo.id, new Todo(todo)])
    );
    this.currentId = -1;
  }

  addTodo = (todo: ITodo) => {
    const newTodo = new Todo(todo);
    this._todos.set(newTodo.id, newTodo);
  };

  deleteTodo = (id: string) => {
    this._todos.delete(id);
  };

  updateTodo = (todo: ITodo) => {
    const newTodo = new Todo(todo);
    this._todos.set(todo.id, newTodo);
  };

  toggleCompleted = (id: string) => {
    this._todos.get(id)?.toggle();
  };

  clearTodos = () => {
    this._todos.clear();
  };

  setCurrentId = (id: number | string) => {
    this.currentId = id;
  };
}

export default TodoStore;
