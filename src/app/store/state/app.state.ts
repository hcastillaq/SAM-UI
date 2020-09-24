import { IAuthState } from "./auth.state";
import { RouterReducerState } from "@ngrx/router-store";
import { initialAuthState } from '../reducers/auth.reducer';

export interface IAppState {
  router?: RouterReducerState;
  auth: IAuthState;
}

export const appState = {
  auth: initialAuthState,
};

export function getInitialAppState(): IAppState {
  return appState;
}
