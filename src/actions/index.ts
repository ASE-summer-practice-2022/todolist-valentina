export const CREATE_TODO = "CREATE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export function createTodo(
  id: string,
  name: string,
  dateIn: string,
  dateOut: string,
  desc: string,
  completed: boolean
) {
  return {
    type: CREATE_TODO,
    id,
    name,
    dateIn,
    dateOut,
    desc,
    completed,
  };
}

export function removeTodo(id: string) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

export function updateTodo(
  id: string,
  name: string,
  dateIn: string,
  dateOut: string,
  desc: string,
  completed: boolean
) {
  return {
    type: UPDATE_TODO,
    id,
    name,
    dateIn,
    dateOut,
    desc,
    completed,
  };
}
