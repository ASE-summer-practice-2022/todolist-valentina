import React, { createContext, useReducer } from "react";
import todoReducer from "../reducers/todoReducer";
import { iTask } from "../types";

interface iContextProps {
  dispatch?: any;
}

interface iTaskContextProps extends iContextProps {
  tasks: iTask[];
  currentId: number | string;
}

const initialState: iTaskContextProps = {
  tasks: JSON.parse(localStorage.getItem("todos") || "{}") || [],
  currentId: -1,
};

export const TaskContext = createContext(initialState);

interface iProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: iProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, currentId: state.currentId, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
