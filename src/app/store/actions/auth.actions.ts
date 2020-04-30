import { createAction, props } from "@ngrx/store";
import { IAccount } from "src/app/interfaces/account";

export enum EAuthActions {
  LOGIN = "[AUTH] LOGIN",
  LOGOUT = "[AUTH] LOGOUT",
  LOADING = "[AUTH] SET LOADING",
}

export const authActionLogin = createAction(
  EAuthActions.LOGIN,
  props<IAccount>()
);

export const authActionLoading = createAction(
  EAuthActions.LOADING,
  props<{ loading: Boolean }>()
);

export const authActionLogout = createAction(EAuthActions.LOGOUT);
