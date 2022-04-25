import { Area, Desk } from './map';

export interface User {
  id: string;
  areas?: Area[];
  desks?: Desk[];
  template?: string;
  role: string;
  email: string;
  firstName: string;
  lastName?: string;
  companyName: string;
  bookedDesk?: any[];
}
