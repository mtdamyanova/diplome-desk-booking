import { Area, Desk } from './map';

export interface User {
  id: string;
  areas?: Area[];
  desks?: Desk[];
  template?: string;
  role: string;
  email: string;
  firstName: string;
  companyName: string;
  bookedDesk?: any[];
}

export interface Admin {
  areas?: Area[];
  companyName: string;
  desks?: Desk[];
  email: string;
  firstName: string;
  id: string;
  role: string;
  template: string;
}

export interface UserDataOnSingUp {
  firstName: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
