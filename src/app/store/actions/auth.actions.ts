import { createAction, props } from "@ngrx/store";
import { IAccount } from "src/app/interfaces/account";

export enum EAuthActions {
  LOGIN = "[AUTH] LOGIN",
  LOGOUT = "[AUTH] LOGOUT",
}

export const authActionLogin = createAction(
  EAuthActions.LOGIN,
  props<IAccount>()
);

export const authActionLogout = createAction(EAuthActions.LOGOUT);
