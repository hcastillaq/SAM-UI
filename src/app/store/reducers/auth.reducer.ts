import { Action, createReducer, on } from "@ngrx/store";
import { IAuthState, initialAuthState } from "../state/auth.state";

const authReducer$ = createReducer(initialAuthState);

export function authReducer(state, action) {
  return authReducer$(state, action);
}
