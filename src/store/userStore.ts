import {create} from 'zustand';

interface UserState {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLogged: false,
  setIsLogged: (value) => set({isLogged: value}),
}));
