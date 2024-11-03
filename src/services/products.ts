import axios from './axios.ts';
import {useProductStore} from '../store/productStore.ts';
import {Product} from '../types/product.ts';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('/products');
    console.debug('products :: getProducts', response.data);
    useProductStore.getState().setProducts(response.data);
    return response.data;
  } catch (error) {
    console.error('products :: getProducts', error);
    return [];
  }
};
