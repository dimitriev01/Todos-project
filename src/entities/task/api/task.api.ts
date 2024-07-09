import { api } from 'shared/api';
import {
  IAddTaskRequestParams,
  IDeleteTaskRequestParams,
  IToggleTaskRequestParams,
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
  const response = await api.get(`${baseURL}?startDate=${params.startDate}?endDate=${params.startDate}`);
  return response.data;
};

export const deleteTaskRequest = async (params: IDeleteTaskRequestParams): Promise<number> => {
  const response = await api.delete(`${baseURL}/${params.id}`);
  return response.data;
};

export const toggleTaskRequest = async (params: IToggleTaskRequestParams): Promise<ITask> => {
  const response = await api.put(`${baseURL}/${params.id}`, { data: params });
  return response.data;
};

export const addTaskRequest = async (params: IAddTaskRequestParams): Promise<ITask> => {
  const response = await api.post(`${baseURL}`, { data: params });
  return response.data;
};
