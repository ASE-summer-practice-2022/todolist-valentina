export interface ITask {
  id: string;
  name: string;
  dateIn: string | Date;
  dateOut: string | Date;
  desc: string;
  completed: boolean;
}

export interface IState {
  tasks: ITask[];
  removeTask?: any;
  addTask?: any;
  editTask?: any;
  clearTasks?: any;
}

export interface IAction {
  type: string;
  payload: any;
}
