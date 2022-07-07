import { createContext } from "react";

import TodoStore from "./TodoStore";

const RootContext = createContext({
  todoStore: new TodoStore(),
});

export default RootContext;