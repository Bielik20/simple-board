import { InjectionToken } from '@angular/core';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { boardReducer, BoardState } from './board/board.reducer';
import { cardsReducer, CardsState } from './cards/cards.reducer';
import { listReducer, ListState } from './list/list.reducer';
import { RouterStateUrl } from './router/router.model';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  board: BoardState;
  cards: CardsState;
  list: ListState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  board: boardReducer,
  cards: cardsReducer,
  list: listReducer
};

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Reducers');

export function getReducers() {
  return reducers;
}

export const reducerProvider = [{ provide: reducerToken, useFactory: getReducers }];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
