import { Action, createReducer, on } from "@ngrx/store";
import { IAuthState, initialAuthState } from "../state/auth.state";
import * as authActions from "../actions/auth.actions";

const authReducer$ = createReducer(
  initialAuthState,
  on(authActions.authActionLoading, (state, { loading }) => ({
    ...state,
    loading,
  }))
);

export function authReducer(state, action) {
  return authReducer$(state, action);
}
