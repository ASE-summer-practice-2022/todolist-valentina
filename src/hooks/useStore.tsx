import { useContext } from "react";

import RootContext from "../stores";

const useStore = () => useContext(RootContext);

export default useStore;
