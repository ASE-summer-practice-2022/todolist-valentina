export interface iTask {
  id: string;
  name: string;
  dateIn: string | Date;
  dateOut: string | Date;
  desc: string;
  completed: boolean;
}
