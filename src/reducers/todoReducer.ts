import { v4 as uuidv4 } from "uuid";
import { TASK_STATE } from "../constants";
import { IAction, ITask } from "../types/core";

const initialState: any = [];

export default function todoReducers(state = initialState, action: IAction) {
  switch (action.type) {
    case TASK_STATE.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: ITask) => task.id !== action.payload),
      };

    case TASK_STATE.ADD_TASK:
      const newTask = { ...action.payload, id: uuidv4(), completed: false };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };

    case TASK_STATE.EDIT_TASK:
      const updateTask = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task: ITask) => (task.id === updateTask.id ? updateTask : task)),
      };

    case TASK_STATE.CLEAR_TASKS:
      return {
        ...state,
        tasks: initialState,
      };

    case TASK_STATE.SET_CURRENT_ID:
      return {
        ...state,
        currentId: action.payload,
      };

    case TASK_STATE.TOGGLE_TASK_COMPLETED:
      const id = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task: ITask) => (task.id === id ? { ...task, completed: !task.completed } : task)),
      };

    default:
      return state;
  }
}
