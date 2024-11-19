import {create} from 'zustand';
import {Goodness} from '../types/goodness.ts';

interface State {
  goodness: Goodness[];
  setGoodness: (goodness: Goodness[]) => void;
}

export const useGoodnessStore = create<State>((set) => ({
  goodness: [],
  setGoodness: (goodness) => set({goodness: goodness}),
}));
