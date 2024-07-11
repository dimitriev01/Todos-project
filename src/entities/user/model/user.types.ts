export interface IUserStore {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
}

export interface IUser {
  name: string;
  id: string;
}
