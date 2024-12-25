export type Role = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
  favorite_products: number[];
  favorite_recipes: number[];
}

export interface CreateUserData {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserData {
  username?: string;
  favorite_products?: number[];
  favorite_recipes?: number[];
}
