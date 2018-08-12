import { InjectionToken } from '@angular/core';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'environments/environment';

import { boardsReducer, BoardsState } from './boards/boards.reducer';
import { cardsReducer, CardsState } from './cards/cards.reducer';
import { listsReducer, ListsState } from './lists/lists.reducer';
import { RouterStateUrl } from './router/router.model';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  boards: BoardsState;
  cards: CardsState;
  lists: ListsState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  boards: boardsReducer,
  cards: cardsReducer,
  lists: listsReducer
};

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Reducers');

export function getReducers() {
  return reducers;
}

export const reducerProvider = [{ provide: reducerToken, useFactory: getReducers }];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
