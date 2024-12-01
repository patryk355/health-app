import axios from './axios.ts';
import {CreateUserData, User} from '../types/user.ts';

export const createUser = async (data: CreateUserData): Promise<boolean> => {
  try {
    const response = await axios.post('/users', data);
    console.debug('user :: createUser', response.data);
    return true;
  } catch (error) {
    console.error('user :: createUser', error);
    return false;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('/users');
    console.debug('user :: getUsers', response.data);
    return response.data;
  } catch (error) {
    console.error('user :: getUsers', error);
    return [];
  }
};
