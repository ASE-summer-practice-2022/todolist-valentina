import React, { useState } from "react";
import DateRange from "../DateRange/DateRange";
import "./AddPopup";

interface iAddPopupProps {
  close: any;
  addTask: any;
}

const initData = { name: "", desc: "", dateIn: new Date(), dateOut: new Date() };

function AddPopup(props: iAddPopupProps) {
  const [data, setData] = useState(initData);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.addTask(data);
    console.log(data.name);
    setData({ ...data, name: "" });
    props.close();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, name: e.target.value });
  }

  function changeDateIn(date: Date) {
    setData({ ...data, dateIn: date });
  }

  function changeDateOut(date: Date) {
    setData({ ...data, dateOut: date });
  }

  function changeDesc(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setData({ ...data, desc: e.target.value });
  }

  return (
    <div className="Popup">
      <div className="Popup__Overlay" onClick={props.close}></div>
      <form className="Popup__Form" onSubmit={handleSubmit}>
        <div className="Popup__Body">
          <div className="Popup__Row">
            <div className="Popup__Key">Дата выдачи:</div>
            <DateRange onChange={changeDateIn} date={data.dateIn} />
          </div>
          <div className="Popup__Row">
            <div className="Popup__Key">Дата сдачи:</div>
            <DateRange onChange={changeDateOut} date={data.dateOut} />
          </div>
          <div className="Popup__Row">
            <div className="Popup__Key">Тема:</div>
            <input
              type="text"
              className="Popup__Input"
              name="text"
              autoComplete="off"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="Popup__Row Popup__Desc">
            <div className="Popup__Key">Описание:</div>
            <textarea className="Popup__Input" name="text" autoComplete="off" value={data.desc} onChange={changeDesc} />
          </div>
        </div>
        <div className="Popup__Footer">
          <button type="submit" className="Popup__Btn Btn">
            Добавить
          </button>
          <div className="Popup__Btn Btn" onClick={props.close}>
            Отмена
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPopup;
