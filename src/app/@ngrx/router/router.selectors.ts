import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from './router.model';

const getRouterFeature = createFeatureSelector('router');

export const getRouterNavigationId = createSelector(
  getRouterFeature,
  (state: RouterReducerState<RouterStateUrl>) => state.navigationId
);

export const getRouterState = createSelector(
  getRouterFeature,
  (state: RouterReducerState<RouterStateUrl>) => (state ? state.state : null)
);

export const getRouterData = createSelector(getRouterState, state => state.data);
export const getRouterUrl = createSelector(getRouterState, state => state.url);
export const getRouterParams = createSelector(getRouterState, state => state.params);
export const getRouterQueryParams = createSelector(getRouterState, state => state.queryParams);
