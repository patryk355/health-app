import axios from './axios.ts';
import {useGoodnessStore} from '../store/goodnessStore.ts';
import {Goodness} from '../types/goodness.ts';

export const getGoodness = async (): Promise<Goodness[]> => {
  try {
    const response = await axios.get('/goodness');
    console.debug('goodness :: getGoodness', response.data);
    useGoodnessStore.getState().setGoodness(response.data);
    return response.data;
  } catch (error) {
    console.error('goodness :: getGoodness', error);
    return [];
  }
};
