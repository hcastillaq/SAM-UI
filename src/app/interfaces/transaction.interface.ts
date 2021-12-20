import { Company } from './company.interface';
import { User } from './user.interface';

export interface Transaction {
  _id?: String;
  description?: String;
  mount?: Number;
  date?: String;
  company?: Company;
  user?: User;
  type?: String;
  __typename?: String;
}
