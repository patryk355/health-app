import {create} from 'zustand';
import {User} from '../types/user.ts';

interface UserState {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  token: string;
  setToken: (value: string) => void;
  user: User | null;
  setUser: (value: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLogged: false,
  setIsLogged: (isLogged) => set({isLogged}),
  token: '',
  setToken: (token) => set({token}),
  user: null,
  setUser: (user) => set({user}),
}));
