import {AxiosError} from 'axios';
import {toast} from 'react-toastify';

import i18n from '../i18n.ts';
import axios from './axios.ts';
import {CreateUserData, User} from '../types/user.ts';

export const createUser = async (data: CreateUserData): Promise<boolean> => {
  try {
    const response = await axios.post('/users', data);
    console.debug('users :: createUser', response.data);
    return true;
  } catch (error) {
    console.error('users :: createUser', error);
    if (error instanceof AxiosError) {
      if (error.response?.data === 'email_already_exists') {
        toast.error(i18n.t('users:USER_ALREADY_EXISTS'));
      }
      throw error.response?.data;
    }
    throw false;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('/users');
    console.debug('users :: getUsers', response.data);
    return response.data;
  } catch (error) {
    console.error('users :: getUsers', error);
    return [];
  }
};

export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`/users/${userId}`);
    console.debug('users :: deleteUser', response.data);
    return true;
  } catch (error) {
    console.error('users :: deleteUser', error);
    throw false;
  }
};
