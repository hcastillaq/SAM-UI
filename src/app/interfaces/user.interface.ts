import { Company } from './company.interface';

export interface User {
  _id?: String;
  email?: String;
  name?: String;
  rol?: String;
  company?: Company;
  password?: String;
}
