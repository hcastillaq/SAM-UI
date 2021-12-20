import { createAction, props } from '@ngrx/store';
import { Account } from 'src/app/interfaces/account';
import { LoginResponse } from 'src/app/interfaces/auth.interface';
import { Company } from 'src/app/interfaces/company.interface';
import { Register } from 'src/app/interfaces/register.interface';
import { User } from 'src/app/interfaces/user.interface';

export enum AuthActions {
  LOGIN = '[AUTH] LOGIN',
  LOGIN_SUCCESS = '[AUTH] LOGIN SUCCESS',
  LOGOUT = '[AUTH] LOGOUT',
  LOADING = '[AUTH] SET LOADING',
  REGISTER = '[AUTH] REGISTER',
  SET_DATA = '[AUTH] SET DATA',
}

export const authActionLogin = createAction(
  AuthActions.LOGIN,
  props<Account>(),
);

export const authActionLoading = createAction(
  AuthActions.LOADING,
  props<{ loading: Boolean }>(),
);

export const authActionRegister = createAction(
  AuthActions.REGISTER,
  props<Register>(),
);
export const authActionLogout = createAction(AuthActions.LOGOUT);

export const authActionLoginSuccess = createAction(
  AuthActions.LOGIN_SUCCESS,
  props<LoginResponse>(),
);
export const authActionSetData = createAction(
  AuthActions.SET_DATA,
  props<{ user?: User; company?: Company }>(),
);
