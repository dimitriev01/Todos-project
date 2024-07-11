export interface ITaskParams {
  task: ITask;
}

export enum EnumTaskStatus {
  ACTIVE = 'Активна',
  COMPLETED = 'Выполнена',
}

export interface ITask {
  id: string;
  title: string;
  status: EnumTaskStatus;
  description: string;
  date: string;
}

export interface IDeleteTaskRequestParams {
  userId: string;
  taskId: string;
}

export interface IEditTaskRequestParams {
  userId: string;
  task: ITask;
}

export interface IAddTaskRequestParams {
  userId: string;
  task: ITask;
}

export interface IGetTasksForWeekRequestParams {
  userId: string;
  startDate: string;
  endDate: string;
}

export interface IGetAllTaskRequestParams {
  userId: string;
  date: string;
}

export interface ITasksStore {
  tasks: ITask[];
  isLoading: boolean;
  addTask: (params: IAddTaskRequestParams) => void;
  deleteTask: (params: IDeleteTaskRequestParams) => void;
  editTask: (params: IEditTaskRequestParams) => void;
  fetchTasks: (params: IGetAllTaskRequestParams) => void;
  fetchTasksForWeek: (params: IGetTasksForWeekRequestParams) => void;
}
