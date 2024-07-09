import { create } from 'zustand';
import {
  deleteTaskRequest,
  toggleTaskRequest,
  addTaskRequest,
  getAllTasksRequest,
  getTasksForWeekRequest,
} from '../api/task.api';
import {
  IAddTaskRequestParams,
  IDeleteTaskRequestParams,
  IGetAllTaskRequestParams,
  IGetTasksForWeekRequestParams,
  ITasksStore,
  IToggleTaskRequestParams,
} from './task.types';

export const useTasksStore = create<ITasksStore>()((set, get) => ({
  tasks: [],
  isLoading: false,
  addTask: async (params: IAddTaskRequestParams) => {
    try {
      set({ isLoading: true });
      const response = await addTaskRequest(params);
      set({
        tasks: [...get().tasks, response],
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTask: async (params: IDeleteTaskRequestParams) => {
    try {
      set({ isLoading: true });
      await deleteTaskRequest(params);
      set({
        tasks: get().tasks.filter((task) => task.id !== params.id),
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
  toggleTask: async (params: IToggleTaskRequestParams) => {
    try {
      set({ isLoading: true });
      const response = await toggleTaskRequest(params);

      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === params.id ? { ...task, status: response.status } : task)),
      }));
    } catch (e: any) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTasks: async (params: IGetAllTaskRequestParams) => {
    try {
      set({ isLoading: true });

      const response = await getAllTasksRequest(params);

      set({ tasks: response });
    } catch (e: any) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTasksForWeek: async (params: IGetTasksForWeekRequestParams) => {
    try {
      set({ isLoading: true });

      const response = await getTasksForWeekRequest(params);

      set({ tasks: response });
    } catch (e: any) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
