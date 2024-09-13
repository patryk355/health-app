import {useUserStore} from '../store/userStore.ts';

export const logout = () => {
  localStorage.removeItem('token');
  const {setUser, setToken, setIsLogged} = useUserStore.getState();
  setUser(null);
  setToken('');
  setIsLogged(false);
};
