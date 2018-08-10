import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Store, createReducer } from 'ngrx-actions/dist';

import { Board } from './../board.model';

export interface BoardsState extends EntityState<Board> {
  selectedBoardId: string;
}

export const boardsAdapter: EntityAdapter<Board> = createEntityAdapter({
  selectId: board => board.id,
  sortComparer: false
});

@Store<BoardsState>(
  boardsAdapter.getInitialState({
    selectedBoardId: null
  })
)
export class BoardsStore {}

export function boardsReducer(state, action) {
  return createReducer(BoardsStore)(state, action);
}
