import { Action } from '@ngrx/store';

export class BoardSelected implements Action {
  readonly type = '[Board] selected';
  constructor(public boardId: string) {}
}
