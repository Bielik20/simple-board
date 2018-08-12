import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cardsAdapter, CardsState } from './cards.reducer';

export const getCardsState = createFeatureSelector<CardsState>('cards');

export const {
  selectIds: getCardIds,
  selectEntities: getCardEntities,
  selectAll: getAllCards,
  selectTotal: getTotalCards
} = cardsAdapter.getSelectors(getCardsState);
