import { Company } from './company.interface';
import { User } from './user.interface';

export interface LoginResponse {
  token: string;
  user: User;
  company: Company;
}
