import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { ofAction } from 'ngrx-actions/dist';
import { from } from 'rxjs';
import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';

import { BoardSelected } from '../boards/boards.actions';
import { Card } from './card.model';
import { AddCard, ModifyCard, RemoveCard } from './cards.actions';

@Injectable()
export class CardsEffects {
  @Effect()
  loadCards$ = this.actions$.pipe(
    ofAction(BoardSelected),
    map(action => action.boardId),
    filter(boardId => !!boardId),
    switchMap(boardId => {
      return this.afs
        .collection<Card>('cards', ref => {
          return ref.where('boardId', '==', boardId).orderBy('order');
        })
        .stateChanges()
        .pipe(
          mergeMap(actions => actions),
          map(action => {
            return {
              type: `[Cards] ${action.type}`,
              payload: {
                ...action.payload.doc.data(),
                id: action.payload.doc.id
              }
            };
          })
        );
    })
  );

  @Effect({ dispatch: false })
  addCard$ = this.actions$.pipe(
    ofAction<AddCard>(AddCard),
    switchMap(action => {
      const ref = this.afs.collection('cards');
      return from(ref.add(action.payload)).pipe(take(1));
    })
  );

  @Effect({ dispatch: false })
  modifyCard$ = this.actions$.pipe(
    ofAction<ModifyCard>(ModifyCard),
    switchMap(action => {
      const ref = this.afs.collection<Card>('cards').doc(action.id);
      return from(ref.update(action.changes)).pipe(take(1));
    })
  );

  @Effect({ dispatch: false })
  removeCard$ = this.actions$.pipe(
    ofAction<RemoveCard>(RemoveCard),
    switchMap(action => {
      const ref = this.afs.collection<Card>('cards').doc(action.id);
      return from(ref.delete()).pipe(take(1));
    })
  );

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
