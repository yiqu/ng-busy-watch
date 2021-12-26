import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { apiReducer } from './api.reducer';
import { ApiState } from './app.state';

export interface AppState {
  myRouter?: RouterReducerState<any>,
  api: ApiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  myRouter: routerReducer,
  api: apiReducer
}
