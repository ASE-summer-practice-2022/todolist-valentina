import { createContext } from "react";
import { TodoStore } from "./TodoStore";

export const RootContext = createContext({
  todoStore: new TodoStore(),
});
