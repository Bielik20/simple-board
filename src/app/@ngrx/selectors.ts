import { createSelector } from '@ngrx/store';

import { getSelectedBoard, getSelectedBoardId } from './boards/boards.selectors';
import { getAllCards } from './cards/cards.selectors';
import { ListFull } from './lists/list.model';
import { getAllLists } from './lists/lists.selectors';

export const getSelectedBoardLists = createSelector(
  getSelectedBoardId,
  getAllLists,
  (boardId, lists) => lists.filter(list => list.boardId === boardId)
);

export const getSelectedBoardFull = createSelector(
  getSelectedBoard,
  getSelectedBoardLists,
  getAllCards,
  (board, lists, cards) => {
    if (!board) {
      return null;
    }
    const listsDict: { [listId: string]: ListFull } = {};
    for (const list of lists) {
      listsDict[list.id] = {
        ...list,
        cards: []
      };
    }
    for (const card of cards) {
      if (listsDict[card.listId]) {
        listsDict[card.listId].cards.push(card);
      }
    }
    return {
      ...board,
      lists: lists.map(list => listsDict[list.id])
    };
  }
);
