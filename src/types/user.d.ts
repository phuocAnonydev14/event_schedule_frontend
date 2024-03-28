import { Role } from './route';

export type Role = 'user' | 'admin';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
}
