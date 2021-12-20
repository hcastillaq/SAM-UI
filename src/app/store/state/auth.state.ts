import { Company } from 'src/app/interfaces/company.interface';
import { User } from 'src/app/interfaces/user.interface';

export interface IAuthState {
  loading: Boolean;
  user: User;
  company: Company;
}
