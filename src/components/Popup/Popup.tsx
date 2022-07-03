import React, { useContext } from "react";
import { ADD_TASK, EDIT_TASK, SET_CURRENT_ID } from "../../actions/constants";
import { TaskContext } from "../../helpers/GlobalState";
import { useForm } from "../../helpers/useForm";
import { iTask } from "../../types";
import DateRange from "../DateRange/DateRange";
import "./Popup.scss";

function Popup() {
  const { tasks, currentId, dispatch } = useContext(TaskContext);
  const initialState = tasks.find((task) => task.id === currentId) || {
    dateIn: new Date(),
    dateOut: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  };
  const [values, setValues] = useForm(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.name) {
      dispatch({ type: currentId ? EDIT_TASK : ADD_TASK, payload: values });
      handleClose();
    }
  };

  const handleClose = () => {
    dispatch({ type: SET_CURRENT_ID, payload: -1 });
  };

  return (
    <div className="Popup">
      <div className="Popup__Overlay" onClick={handleClose}></div>
      <form className="Popup__Form" onSubmit={handleSubmit}>
        <div className="Popup__Body">
          <div className="Popup__Row">
            <div className="Popup__Key">Дата выдачи:</div>
            <DateRange onChange={setValues} name="dateIn" date={new Date(values.dateIn || null)} />
          </div>
          <div className="Popup__Row">
            <div className="Popup__Key">Дата сдачи:</div>
            <DateRange onChange={setValues} name="dateOut" date={new Date(values.dateOut || null)} />
          </div>
          <div className="Popup__Row">
            <div className="Popup__Key">Тема:</div>
            <input
              type="text"
              className="Popup__Input"
              name="name"
              autoComplete="off"
              value={values.name}
              onChange={setValues}
            />
          </div>
          <div className="Popup__Row Popup__Desc">
            <div className="Popup__Key">Описание:</div>
            <textarea
              className="Popup__Input"
              name="desc"
              autoComplete="off"
              value={values.desc}
              onChange={setValues}
            />
          </div>
        </div>
        <div className="Popup__Footer">
          <button type="submit" className="Popup__Btn Btn">
            {currentId ? "Сохранить" : "Создать"}
          </button>
          <div className="Popup__Btn Btn" onClick={handleClose}>
            Отмена
          </div>
        </div>
      </form>
    </div>
  );
}

export default Popup;
