import { createAction, props } from '@ngrx/store';

const GET_DATA_START: string = "[Admin/API] Get api data start";
const GET_DATA_SUCCESS: string = "[Admin/API] Get api data success";
const GET_DATA_FAILED: string = "[Admin/API] Get api data failure";

export const getDataStart = createAction(
  GET_DATA_START,
)

export const getDataSuccess = createAction(
  GET_DATA_SUCCESS,
  props<{payload: any}>()
)

export const getDataFailure = createAction(
  GET_DATA_FAILED,
  props<{errMsg: string}>()
)
