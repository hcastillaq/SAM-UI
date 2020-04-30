import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import { IAppState } from "../state/app.state";
import { authReducer } from "./auth.reducer";

export interface State {}

export const reducers: ActionReducerMap<IAppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
