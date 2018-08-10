import { Action } from '@ngrx/store';

import { Card } from './card.model';

export class CardAdded implements Action {
  readonly type = '[Cards] added';
  constructor(public payload: Card) {}
}

export class CardModified implements Action {
  readonly type = '[Cards] modified';
  constructor(public payload: Card) {}
}

export class CardRemoved implements Action {
  readonly type = '[Cards] removed';
  constructor(public payload: Card) {}
}

export class AddCard implements Action {
  readonly type = '[Cards] add';
  constructor(public payload: Partial<Card>) {}
}

export class ModifyCard implements Action {
  readonly type = '[Cards] modify';
  constructor(public id: string, public changes: Partial<Card>) {}
}

export class RemoveCard implements Action {
  readonly type = '[Cards] remove';
  constructor(public id: string) {}
}
