import { ICompany } from './company.interface';

export interface IUser {
  email: String,
  name: String
  rol: String
  company: ICompany
  password?: String
}