export type Role = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
}
