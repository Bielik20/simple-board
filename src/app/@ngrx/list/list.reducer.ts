import { ListCardsState, listCardsReducer } from './list-cards/list-cards';
import { combineReducers } from '@ngrx/store';

import { listsReducer, ListsState } from './lists/lists.reducer';

export interface ListState {
  lists: ListsState;
  listCards: ListCardsState;
}

export const listReducer = combineReducers({
  lists: listsReducer,
  listCards: listCardsReducer
});
