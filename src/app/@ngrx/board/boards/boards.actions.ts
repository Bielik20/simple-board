import { Action } from '@ngrx/store';

import { Board } from '../board.model';

export class BoardAdded implements Action {
  readonly type = '[Boards] added';
  constructor(public payload: Board) {}
}

export class BoardModified implements Action {
  readonly type = '[Boards] modified';
  constructor(public payload: Board) {}
}

export class BoardRemoved implements Action {
  readonly type = '[Boards] removed';
  constructor(public payload: Board) {}
}

export class AddBoard implements Action {
  readonly type = '[Boards] add';
  constructor(public payload: Partial<Board>) {}
}

export class ModifyBoard implements Action {
  readonly type = '[Boards] modify';
  constructor(public id: string, public changes: Partial<Board>) {}
}

export class RemoveBoard implements Action {
  readonly type = '[Boards] remove';
  constructor(public id: string) {}
}
