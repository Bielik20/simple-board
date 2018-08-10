import { combineReducers } from '@ngrx/store';

import { boardListsReducer, BoardListsState } from './board-lists/board-lists.reducer';
import { boardsReducer, BoardsState } from './boards/boards.reducer';

export interface BoardState {
  boards: BoardsState;
  boardLists: BoardListsState;
}

export const boardReducer = combineReducers({
  boards: boardsReducer,
  boardLists: boardListsReducer
});
