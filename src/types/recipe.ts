export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  images: string[];
  active: boolean;
  products?: number[];
}

export interface CreateRecipeData {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  images: string[];
  products: number[] | null;
}
