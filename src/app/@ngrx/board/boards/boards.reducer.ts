import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, Store } from 'ngrx-actions/dist';

import { BoardSelected } from './../board.actions';
import { Board } from './../board.model';
import { BoardAdded, BoardModified, BoardRemoved } from './boards.actions';

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
export class BoardsStore {
  @Action(BoardSelected)
  selected(state: BoardsState, action: BoardSelected): BoardsState {
    return { ...state, selectedBoardId: action.boardId };
  }

  @Action(BoardAdded)
  addedBoard(state: BoardsState, action: BoardAdded): BoardsState {
    return boardsAdapter.upsertOne(action.payload, state);
  }

  @Action(BoardModified)
  modifiedBoard(state: BoardsState, action: BoardModified): BoardsState {
    return boardsAdapter.updateOne(
      {
        id: action.payload.id,
        changes: action.payload
      },
      state
    );
  }

  @Action(BoardRemoved)
  removedBoard(state: BoardsState, action: BoardRemoved): BoardsState {
    return boardsAdapter.removeOne(action.payload.id, state);
  }
}

export function boardsReducer(state, action) {
  return createReducer(BoardsStore)(state, action);
}
