import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Store, createReducer, Action } from 'ngrx-actions/dist';

import { Card } from './card.model';
import { CardAdded, CardModified, CardRemoved } from './cards.actions';

export interface CardsState extends EntityState<Card> {}

export const cardsAdapter: EntityAdapter<Card> = createEntityAdapter({
  selectId: card => card.id,
  sortComparer: false
});

@Store<CardsState>(cardsAdapter.getInitialState())
export class CardsStore {
  @Action(CardAdded)
  addedCard(state: CardsState, action: CardAdded): CardsState {
    return cardsAdapter.addOne(action.payload, state);
  }

  @Action(CardModified)
  modifiedCard(state: CardsState, action: CardModified): CardsState {
    return cardsAdapter.updateOne(
      {
        id: action.payload.id,
        changes: action.payload
      },
      state
    );
  }

  @Action(CardRemoved)
  removedCard(state: CardsState, action: CardRemoved): CardsState {
    return cardsAdapter.removeOne(action.payload.id, state);
  }
}

export function cardsReducer(state, action) {
  return createReducer(CardsStore)(state, action);
}
