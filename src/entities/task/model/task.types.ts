export interface ITaskParams {
  task: ITask;
}

export enum EnumTaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface ITask {
  id: string;
  title: string;
  status: EnumTaskStatus;
  description: string;
  date: string;
}

export interface IDeleteTaskRequestParams {
  id: string;
}

export interface IGetTasksForWeekRequestParams {
  startDate: string;
  endDate: string;
}

export interface IGetAllTaskRequestParams {
  date: string;
}

export interface ITasksStore {
  tasks: ITask[];
  isLoading: boolean;
  addTask: (params: ITask) => void;
  deleteTask: (params: IDeleteTaskRequestParams) => void;
  editTask: (params: ITask) => void;
  fetchTasks: (params: IGetAllTaskRequestParams) => void;
  fetchTasksForWeek: (params: IGetTasksForWeekRequestParams) => void;
}
