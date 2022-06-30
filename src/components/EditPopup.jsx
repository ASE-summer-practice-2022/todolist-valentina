import React, { useState } from "react";
import DateRange from "./DateRange";


export default function EditPopup(props) {
  const [data, setData] = useState(props.task)

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(data);
    console.log(data.name);
    setData({...data, name: ""});
    props.close()
  }

  function handleChange(e) {
    setData({...data, name: e.target.value});
  }

  function changeDateIn(date) {
    setData({...data, dateIn: date})
  }

  function changeDateOut(date) {
    setData({...data, dateOut: date})
  }

  function changeDesc(e) {
    setData({...data, desc: e.target.value})
  }

  return (
    <div className="Popup">
      <div className="Popup__Overlay" onClick={props.close}></div>
      <form className="Popup__Form" onSubmit={handleSubmit}>
        <div className="Popup__Body">
          <div className="Popup__Row">
            <div className="Popup__Key">Дата выдачи:</div>
            <DateRange onChange={changeDateIn} date={new Date(data.dateIn)} />
          </div>
          <div className="Popup__Row">
            <div className="Popup__Key">Дата сдачи:</div>
            <DateRange onChange={changeDateOut} date={new Date(data.dateOut)} />
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
            <textarea
              className="Popup__Input"
              name="text"
              autoComplete="off"
              value={data.desc}
              onChange={changeDesc}
            />
          </div>
        </div>
        <div className="Popup__Footer">
          <button type="submit" className="Popup__Btn Btn">Сохранить</button>
          <div className="Popup__Btn Btn" onClick={props.close}>Отмена</div>
        </div>
      </form>
    </div>
  )
}