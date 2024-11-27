import axios from './axios.ts';
import {CreateUserData} from '../types/user.ts';

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
