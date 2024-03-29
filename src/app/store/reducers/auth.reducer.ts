import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../state/auth.state';
import * as authActions from '../actions/auth.actions';

export const initialAuthState: IAuthState = {
  loading: false,
  user: null,
  company: null,
};

const authReducer$ = createReducer(
  initialAuthState,
  on(authActions.authActionLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(authActions.authActionSetData, (state, data) => ({
    ...state,
    data,
  })),
);

export function authReducer(state, action) {
  return authReducer$(state, action);
}
