import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '../actions/auth.actions';
import { IAppState } from '../state/app.state';
import { authReducer } from './auth.reducer';

export const reducers: ActionReducerMap<IAppState> = {
  auth: authReducer,
  router: routerReducer,
};

export function clearState(reducer) {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
