import axios from './axios.ts';
import {useCategoryStore} from '../store/categoryStore.ts';
import {Category} from '../types/category.ts';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get('/categories');
    console.debug('categories :: getCategories', response.data);
    useCategoryStore.getState().setCategories(response.data);
    return response.data;
  } catch (error) {
    console.error('categories :: getCategories', error);
    return [];
  }
};
