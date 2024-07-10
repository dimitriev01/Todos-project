import { api } from 'shared/api';
import {
  IDeleteTaskRequestParams,
  ITask,
  IGetAllTaskRequestParams,
  IGetTasksForWeekRequestParams,
} from '../model/task.types';

const baseURL = '/tasks';

export const getAllTasksRequest = async (params: IGetAllTaskRequestParams): Promise<ITask[]> => {
  const response = await api.get(`${baseURL}?date=${params.date}`);
  return response.data;
};

export const getTasksForWeekRequest = async (params: IGetTasksForWeekRequestParams): Promise<ITask[]> => {
  const response = await api.get(`${baseURL}`, { data: params });
  return response.data;
};

export const deleteTaskRequest = async (params: IDeleteTaskRequestParams): Promise<ITask> => {
  const response = await api.delete(`${baseURL}/${params.id}`);
  return response.data;
};

export const editTaskRequest = async (params: ITask): Promise<ITask> => {
  const response = await api.put(`${baseURL}/${params.id}`, params);
  return response.data;
};

export const addTaskRequest = async (params: ITask): Promise<ITask> => {
  const response = await api.post(`${baseURL}`, params);
  return response.data;
};
