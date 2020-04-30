import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IAuthState } from "../state/auth.state";

export const selectAuthState = (state: IAppState) => state.auth;

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: IAuthState) => state.loading
);
