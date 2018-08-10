import { InjectionToken } from '@angular/core';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { RouterStateUrl } from './router/router.model';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Reducers');

export function getReducers() {
  return reducers;
}

export const reducerProvider = [{ provide: reducerToken, useFactory: getReducers }];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
