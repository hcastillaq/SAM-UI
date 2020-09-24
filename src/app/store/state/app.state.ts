import { IAuthState, initialAuthState } from "./auth.state";
import { RouterReducerState } from "@ngrx/router-store";

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
