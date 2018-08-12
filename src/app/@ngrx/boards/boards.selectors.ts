import { createFeatureSelector, createSelector } from '@ngrx/store';

import { boardsAdapter, BoardsState } from './boards.reducer';

export const getBoardsState = createFeatureSelector<BoardsState>('boards');

export const {
  selectIds: getBoardIds,
  selectEntities: getBoardEntities,
  selectAll: getAllBoards,
  selectTotal: getTotalBoards
} = boardsAdapter.getSelectors(getBoardsState);

export const getSelectedBoardId = createSelector(getBoardsState, state => state.selectedBoardId);

export const getSelectedBoard = createSelector(
  getSelectedBoardId,
  getBoardEntities,
  (boardId, boardEntities) => boardEntities[boardId]
);
