import axios from './axios.ts';
import {useRecipeStore} from '../store/recipeStore.ts';
import {imageValidator} from '../utils/validators.ts';
import {CreateRecipeData, Recipe} from '../types/recipe.ts';

export const getRecipes = async (active = true): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`/recipes?active=${active}`);
    console.debug(`recipes :: getRecipes (active=${active})`, response.data);
    if (active) {
      useRecipeStore.getState().setRecipes(response.data);
    } else {
      useRecipeStore.getState().setInactiveRecipes(response.data);
    }
    return response.data;
  } catch (error) {
    console.error(`recipes :: getRecipes (active=${active})`, error);
    return [];
  }
};

export const getRecipe = async (
  id: string | undefined,
): Promise<Recipe | null> => {
  try {
    const response = await axios.get('/recipes/' + id);
    const images = response.data.images.filter(
      (item: string) => item && imageValidator(item),
    );
    console.debug('recipes :: getRecipe', response.data);
    return {...response.data, images: images};
  } catch (error) {
    console.error('recipes :: getRecipe', error);
    return null;
  }
};

export const createRecipe = async (
  data: CreateRecipeData,
): Promise<true | null> => {
  try {
    const response = await axios.post('/recipes', data);
    console.debug('recipes :: createRecipe', response.data);
    return true;
  } catch (error) {
    console.error('recipes :: createRecipe', error);
    return null;
  }
};

export const deleteRecipe = async (recipeId: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`/recipes/${recipeId}`);
    console.debug('recipes :: deleteRecipe', response.data);
    return true;
  } catch (error) {
    console.error('recipes :: deleteRecipe', error);
    return false;
  }
};
