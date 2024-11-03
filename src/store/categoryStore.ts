import {create} from 'zustand';
import {Category} from '../types/category.ts';

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({categories: categories}),
}));
