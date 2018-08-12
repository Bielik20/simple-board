import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, Store } from 'ngrx-actions/dist';

import { List } from './list.model';
import { ListAdded, ListModified, ListRemoved } from './lists.actions';

export interface ListsState extends EntityState<List> {}

export function sortByOrder(a: List, b: List): number {
  return a.order - b.order;
}

export const listsAdapter: EntityAdapter<List> = createEntityAdapter({
  selectId: list => list.id,
  sortComparer: sortByOrder
});

@Store<ListsState>(listsAdapter.getInitialState())
export class ListsStore {
  @Action(ListAdded)
  addedList(state: ListsState, action: ListAdded): ListsState {
    return listsAdapter.addOne(action.payload, state);
  }

  @Action(ListModified)
  modifiedList(state: ListsState, action: ListModified): ListsState {
    return listsAdapter.updateOne(
      {
        id: action.payload.id,
        changes: action.payload
      },
      state
    );
  }

  @Action(ListRemoved)
  removedList(state: ListsState, action: ListRemoved): ListsState {
    return listsAdapter.removeOne(action.payload.id, state);
  }
}

export function listsReducer(state, action) {
  return createReducer(ListsStore)(state, action);
}
