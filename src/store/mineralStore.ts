import {create} from 'zustand';
import {Mineral} from '../types/mineral.ts';

interface State {
  minerals: Mineral[];
  setMinerals: (minerals: Mineral[]) => void;
}

export const useMineralStore = create<State>((set) => ({
  minerals: [],
  setMinerals: (minerals) => set({minerals: minerals}),
}));
