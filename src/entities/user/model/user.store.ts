import { create } from 'zustand';
import { IUser, IUserStore } from './user.types';
import { emptyUser, LOCAL_STORAGE_USER_KEY } from './user.constatns';

const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

export const useUserStore = create<IUserStore>()((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoading: false,
  setUser: async (params: IUser | null) => {
    try {
      set({
        isLoading: true,
      });

      if (!localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(emptyUser));
      }

      if (localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(params));
        set({
          user: params,
        });
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
