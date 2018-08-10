import { Action } from '@ngrx/store';

import { List } from '../list.model';

export class ListAdded implements Action {
  readonly type = '[Lists] added';
  constructor(public payload: List) {}
}

export class ListModified implements Action {
  readonly type = '[Lists] modified';
  constructor(public payload: List) {}
}

export class ListRemoved implements Action {
  readonly type = '[Lists] removed';
  constructor(public payload: List) {}
}

export class AddList implements Action {
  readonly type = '[Lists] add';
  constructor(public payload: Partial<List>) {}
}

export class ModifyList implements Action {
  readonly type = '[Lists] modify';
  constructor(public id: string, public changes: Partial<List>) {}
}

export class RemoveList implements Action {
  readonly type = '[Lists] remove';
  constructor(public id: string) {}
}
