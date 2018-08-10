import { createReducer, Store } from 'ngrx-actions/dist';

export interface BoardListsState {
  [boardId: string]: {
    listIds: string[];
  };
}

@Store<BoardListsState>({})
export class BoardListsStore {}

export function boardListsReducer(state, action) {
  return createReducer(BoardListsStore)(state, action);
}
