import { createReducer, Store } from 'ngrx-actions/dist';

export interface ListCardsState {
  [boardId: string]: {
    listIds: string[];
  };
}

@Store<ListCardsState>({})
export class ListCardsStore {}

export function listCardsReducer(state, action) {
  return createReducer(ListCardsStore)(state, action);
}
