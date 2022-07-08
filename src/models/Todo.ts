import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export interface ITodo {
  id: string;
  name: string;
  terms: Date[];
  desc: string;
  completed: boolean;
  toggle?: () => void;
}

class Todo implements ITodo {
  id: string;

  name: string;

  terms: Date[];

  desc: string;

  completed: boolean;

  constructor(obj: ITodo) {
    makeAutoObservable(this);

    this.id = obj.id || uuidv4();
    this.name = obj.name;
    this.terms = obj.terms.map((date) => new Date(date));
    this.desc = obj.desc;
    this.completed = obj.completed || false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

export default Todo;
