import { createAction, Action, on, createReducer } from "@ngrx/store"
import { ApiState } from "./app.state";
import * as fromApiActions from './api.actions';

const initialState: ApiState = {
  apiLoading: false,
  githubData: undefined
}

export const apiReducer = createReducer(
  initialState,

  on(fromApiActions.getDataStart, (state) => {
    return {
      ...state,
      apiLoading: true
    }
  }),

  on(fromApiActions.getDataSuccess, (state, {payload}) => {
    return {
      ...state,
      apiLoading: false,
      githubData: payload
    }
  }),

  on(fromApiActions.getDataFailure, (state, {errMsg}) => {
    return {
      ...state,
      apiLoading: false
    }
  }),
)
