export default function Todo(props) {
  return (
    <li className={`Task ${props.completed && 'Task_Completed'}`}>
      <input className='Task__Chb' type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
      <div className='Task__Dates'>
        {props.dateIn && <div className='Task__Datein'>Дата выдачи: {new Date(props.dateIn).toLocaleDateString("ru-RU")}</div>}
        {props.dateOut && <div className='Task__Dateout'>Дата сдачи: {new Date(props.dateOut).toLocaleDateString("ru-RU")}</div>}
      </div>
      <div className='Task__Subject'>{props.name}</div>
      <button className={`Btn ${props.completed && 'Btn_Completed'}`} onClick={() => props.setTask(props.id)}>Открыть</button>
      <button className={`Btn Task__Del ${props.completed && 'Btn_Completed'}`} onClick={() => props.deleteTask(props.id)}>Удалить</button>
    </li>
  )
}