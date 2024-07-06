import { api } from 'shared/api';
import { IAddTaskRequestParams, IDeleteTaskRequestParams, IToggleTaskRequestParams, ITask } from '../model/task.types';

const baseURL = '/tasks';

export const getAllTasksRequest = async (): Promise<ITask[]> => {
  const response = await api.get(`${baseURL}`);
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
