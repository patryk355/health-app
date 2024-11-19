import axios from './axios.ts';
import {useMineralStore} from '../store/mineralStore.ts';
import {Mineral} from '../types/mineral.ts';

export const getMinerals = async (): Promise<Mineral[]> => {
  try {
    const response = await axios.get('/minerals');
    console.debug('minerals :: getMinerals', response.data);
    useMineralStore.getState().setMinerals(response.data);
    return response.data;
  } catch (error) {
    console.error('minerals :: getMinerals', error);
    return [];
  }
};
