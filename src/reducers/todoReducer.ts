import { ADD_TASK, CLEAR_TASKS, EDIT_TASK, REMOVE_TASK, SET_CURRENT_ID } from "../constants";
import { iAction, iTask } from "../types";

const initialState: any = [];

export default function todoReducers(state = initialState, action: iAction) {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: iTask) => task.id !== action.payload),
      };

    case ADD_TASK:
      const id = `task-${Math.random().toString(16).slice(2)}`;
      const newTask = { ...action.payload, id, completed: false };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };

    case EDIT_TASK:
      const updateTask = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task: iTask) => (task.id === updateTask.id ? updateTask : task)),
      };

    case CLEAR_TASKS:
      return {
        ...state,
        tasks: initialState,
      };

    case SET_CURRENT_ID:
      return {
        ...state,
        currentId: action.payload,
      };

    default:
      return state;
  }
}
