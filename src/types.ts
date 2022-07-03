export interface iTask {
  id: string;
  name: string;
  dateIn: string | Date;
  dateOut: string | Date;
  desc: string;
  completed: boolean;
}

export interface iState {
  tasks: iTask[];
  removeTask?: any;
  addTask?: any;
  editTask?: any;
  clearTasks?: any;
}

export interface iAction {
  type: string;
  payload: any;
}
