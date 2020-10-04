import { createAction, props } from "@ngrx/store";
import { IAccount } from "src/app/interfaces/account";
import { IRegister } from 'src/app/interfaces/register.interface';
import { IUser } from 'src/app/interfaces/user.interface';

export enum EAuthActions {
  LOGIN = "[AUTH] LOGIN",
  LOGIN_SUCCESS = "[AUTH] LOGIN SUCCESS",
  LOGOUT = "[AUTH] LOGOUT",
  LOADING = "[AUTH] SET LOADING",
  REGISTER = "[AUTH] REGISTER",
  SET_USER = "[AUTH] SET USER"
}

export const authActionLogin = createAction(
  EAuthActions.LOGIN,
  props<IAccount>()
);

export const authActionLoading = createAction(
  EAuthActions.LOADING,
  props<{ loading: Boolean }>()
);

export const authActionRegister = createAction(
  EAuthActions.REGISTER,
  props<IRegister>()
);
export const authActionLogout = createAction(EAuthActions.LOGOUT);
export const authActionLoginSuccess = createAction(EAuthActions.LOGIN_SUCCESS, props<{ resp: any }>());
export const authActionSetUser = createAction(EAuthActions.SET_USER, props<IUser>());


