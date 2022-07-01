import { combineReducers } from "@reduxjs/toolkit";
import todo from "./todo";

const index = combineReducers({
  todo,
});

export default index;
