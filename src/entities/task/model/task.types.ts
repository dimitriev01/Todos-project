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
}

export interface IDeleteTaskRequestParams {
  id: string;
}

export interface IAddTaskRequestParams {
  data: ITask;
}

export interface IToggleTaskRequestParams {
  id: string;
}

export interface IToggleIsFavouriteTaskParams {
  id: number;
}

export interface ITasksStore {
  tasks: ITask[];
  isLoading: boolean;
  addTask: (params: IAddTaskRequestParams) => void;
  deleteTask: (params: IDeleteTaskRequestParams) => void;
  toggleTask: (params: IToggleTaskRequestParams) => void;
  fetchTasks: () => void;
}
