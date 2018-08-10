import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { ofAction } from 'ngrx-actions/dist';
import { from } from 'rxjs';
import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';

import { List } from '../list.model';
import { AddList, ModifyList, RemoveList } from './lists.actions';
import { BoardSelected } from '../../board/board.actions';

@Injectable()
export class ListsEffects {
  @Effect()
  loadLists$ = this.actions$.pipe(
    ofAction(BoardSelected),
    map(action => action.boardId),
    filter(boardId => !!boardId),
    switchMap(boardId => {
      return this.afs
        .collection<List>('lists', ref => {
          return ref.where('boardId', '==', boardId).orderBy('order');
        })
        .stateChanges()
        .pipe(
          mergeMap(actions => actions),
          map(action => {
            return {
              type: `[Lists] ${action.type}`,
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
  addList$ = this.actions$.pipe(
    ofAction<AddList>(AddList),
    switchMap(action => {
      const ref = this.afs.collection('lists');
      return from(ref.add(action.payload)).pipe(take(1));
    })
  );

  @Effect({ dispatch: false })
  modifyList$ = this.actions$.pipe(
    ofAction<ModifyList>(ModifyList),
    switchMap(action => {
      const ref = this.afs.collection<List>('lists').doc(action.id);
      return from(ref.update(action.changes)).pipe(take(1));
    })
  );

  @Effect({ dispatch: false })
  removeList$ = this.actions$.pipe(
    ofAction<RemoveList>(RemoveList),
    switchMap(action => {
      const ref = this.afs.collection<List>('lists').doc(action.id);
      return from(ref.delete()).pipe(take(1));
    })
  );

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
