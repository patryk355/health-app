import axios from './axios.ts';
import {useProductStore} from '../store/productStore.ts';
import {CreateProductData, Product} from '../types/product.ts';

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

export const getProduct = async (
  id: string | undefined,
): Promise<Product | null> => {
  try {
    const response = await axios.get('/products/' + id);
    console.debug('products :: getProduct', response.data);
    return response.data;
  } catch (error) {
    console.error('products :: getProduct', error);
    return null;
  }
};

export const deleteProduct = async (productId: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`/products/${productId}`);
    console.debug('products :: deleteProduct', response.data);
    return true;
  } catch (error) {
    console.error('products :: deleteProduct', error);
    return false;
  }
};

export const createProduct = async (
  data: CreateProductData,
): Promise<boolean> => {
  try {
    const response = await axios.post('/products', data);
    console.debug('products :: createProduct', response.data);
    return true;
  } catch (error) {
    console.error('products :: createProduct', error);
    throw false;
  }
};
