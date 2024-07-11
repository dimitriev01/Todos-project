import { api } from 'shared/api';
import {
  IDeleteTaskRequestParams,
  ITask,
  IGetAllTaskRequestParams,
  IGetTasksForWeekRequestParams,
  IEditTaskRequestParams,
  IAddTaskRequestParams,
} from '../model/task.types';

const baseURLTasks = '/tasks';

export const getAllTasksRequest = async (params: IGetAllTaskRequestParams): Promise<ITask[]> => {
  const response = await api.get(`${baseURLTasks}?userId=${params.userId}?date=${params.date}`);
  return response.data;
};

export const getTasksForWeekRequest = async (params: IGetTasksForWeekRequestParams): Promise<ITask[]> => {
  const response = await api.get(`${baseURLTasks}?userId=${params.userId}`, {
    data: { startDate: params.startDate, endDate: params.endDate },
  });
  return response.data;
};

export const deleteTaskRequest = async (params: IDeleteTaskRequestParams): Promise<ITask> => {
  const response = await api.delete(`${baseURLTasks}/${params.taskId}`);
  return response.data;
};

export const editTaskRequest = async (params: IEditTaskRequestParams): Promise<ITask> => {
  const response = await api.put(`${baseURLTasks}/${params.task.id}`, params.task);
  return response.data;
};

export const addTaskRequest = async (params: IAddTaskRequestParams): Promise<ITask> => {
  const response = await api.post(`${baseURLTasks}`, params.task);
  return response.data;
};
