import {redirect} from 'react-router-dom';
import {useUserStore} from '../store/userStore.ts';

export function loginLoader() {
  const isLogged = useUserStore.getState().isLogged;
  if (isLogged) {
    return redirect('/');
  }
  return null;
}

export function protectedLoader() {
  const isLogged = useUserStore.getState().isLogged;
  if (!isLogged) {
    return redirect('/');
  }
  return null;
}

export function protectedAdminLoader() {
  const isLogged = useUserStore.getState().isLogged;
  const isAdmin = useUserStore.getState().user?.role === 'admin';
  if (!isLogged || !isAdmin) {
    return redirect('/');
  }
  return null;
}
