import { IUser } from 'src/app/interfaces/user.interface';

export interface IAuthState {
  loading: Boolean;
  user: IUser
}

