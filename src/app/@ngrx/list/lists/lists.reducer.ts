import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Store, createReducer } from 'ngrx-actions/dist';

import { List } from './../list.model';

export interface ListsState extends EntityState<List> {}

export const listsAdapter: EntityAdapter<List> = createEntityAdapter({
  selectId: list => list.id,
  sortComparer: false
});

@Store<ListsState>(listsAdapter.getInitialState())
export class ListsStore {}

export function listsReducer(state, action) {
  return createReducer(ListsStore)(state, action);
}
