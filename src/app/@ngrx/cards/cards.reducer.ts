import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Store, createReducer } from 'ngrx-actions/dist';

import { Card } from './card.model';

export interface CardsState extends EntityState<Card> {}

export const cardsAdapter: EntityAdapter<Card> = createEntityAdapter({
  selectId: card => card.id,
  sortComparer: false
});

@Store<CardsState>(cardsAdapter.getInitialState())
export class CardsStore {}

export function cardsReducer(state, action) {
  return createReducer(CardsStore)(state, action);
}
