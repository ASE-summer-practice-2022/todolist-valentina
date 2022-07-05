import React, { createContext, useReducer } from "react";
import todoReducer from "../reducers/todoReducer";
import { ITask } from "../types/core";

interface IContextProps {
  dispatch?: any;
}

interface ITaskContextProps extends IContextProps {
  tasks: ITask[];
  currentId: number | string;
}

const initialState: ITaskContextProps = {
  tasks: JSON.parse(localStorage.getItem("todos") || "[]"),
  currentId: -1,
};

export const TaskContext = createContext(initialState);

interface IProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: IProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, currentId: state.currentId, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
