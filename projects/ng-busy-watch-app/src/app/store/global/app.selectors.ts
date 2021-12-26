import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ApiState } from './app.state';

export const selectApiFeatureState = createFeatureSelector<ApiState>("api");

export const getisDataLoading = createSelector(
  selectApiFeatureState,
  (state): boolean => {
    return state.apiLoading;
  }
);

export const getApiData = createSelector(
  selectApiFeatureState,
  (state) => {
    return state.githubData;
  }
);
