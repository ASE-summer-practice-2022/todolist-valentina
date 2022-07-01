import { CREATE_TODO, REMOVE_TODO, UPDATE_TODO } from "../actions/index.jsx";

const initialState: any = [];

export default function todo(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_TODO:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          dateIn: action.dateIn,
          dateOut: action.dateOut,
          desc: action.desc,
          completed: action.completed,
        },
      ];
    case REMOVE_TODO:
      return state.filter(({ id }: any) => id !== action.id);
    case UPDATE_TODO:
      return state.map((todo: any) => (todo.id === action.id ? { ...todo, ...action } : todo));
    default:
      return state;
  }
}
