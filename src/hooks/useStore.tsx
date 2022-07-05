import { useContext } from "react";
import { RootContext } from "../stores";

export const useStore = () => useContext(RootContext);
