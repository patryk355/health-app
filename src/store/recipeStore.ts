import {create} from 'zustand';
import {Recipe} from '../types/recipe.ts';

interface State {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  inactiveRecipes: Recipe[];
  setInactiveRecipes: (recipes: Recipe[]) => void;
}

export const useRecipeStore = create<State>((set) => ({
  recipes: [],
  setRecipes: (recipes: Recipe[]) => set({recipes}),
  inactiveRecipes: [],
  setInactiveRecipes: (recipes: Recipe[]) => set({inactiveRecipes: recipes}),
}));
