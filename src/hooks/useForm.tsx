import { DateRange } from "@mui/x-date-pickers-pro";
import { useState } from "react";

import { ITodo } from "../models/Todo";

interface IUseFormActionParams {
  target: {
    name: string;
    value: string | DateRange<Date>;
  };
}

type UseFormFunction = (init: ITodo) => [ITodo, (e: IUseFormActionParams) => void];

const useForm: UseFormFunction = (init) => {
  const [values, setValues] = useState(init);
  const setValuesAction = (e: IUseFormActionParams) => setValues({ ...values, [e.target.name]: e.target.value });

  return [values, setValuesAction];
};

export default useForm;
