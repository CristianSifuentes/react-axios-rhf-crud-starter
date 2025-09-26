export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
}
export type UserCreate = Omit<User, 'id'>;
export type UserUpdate = Omit<User, 'id'>;
