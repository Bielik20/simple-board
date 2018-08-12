import { createFeatureSelector } from '@ngrx/store';

import { listsAdapter, ListsState } from './lists.reducer';

export const getListsState = createFeatureSelector<ListsState>('lists');

export const {
  selectIds: getListIds,
  selectEntities: getListEntities,
  selectAll: getAllLists,
  selectTotal: getTotalLists
} = listsAdapter.getSelectors(getListsState);
