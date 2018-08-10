import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AngularFirestore } from 'angularfire2/firestore';
import { ofAction } from 'ngrx-actions/dist';
import { from } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { BoardSelected } from '../board.actions';
import { Board } from '../board.model';
import { BoardAdded } from './boards.actions';
import { AddBoard, ModifyBoard, RemoveBoard } from './boards.actions';

@Injectable()
export class BoardsEffects {
  @Effect()
  loadBoards$ = this.actions$.pipe(
    ofAction(BoardSelected),
    map(action => action.boardId),
    filter(boardId => !!boardId),
    switchMap(boardId => {
      return this.afs
        .collection<Board>('boards')
        .doc(boardId)
        .valueChanges()
        .pipe(
          map(board => {
            return new BoardAdded({ ...board, id: boardId } as Board);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  addBoard$ = this.actions$.pipe(
    ofAction<AddBoard>(AddBoard),
    switchMap(action => {
      const ref = this.afs.collection('boards');
      return from(ref.add(action.payload)).pipe(take(1));
    })
  );

  @Effect({ dispatch: false })
  modifyBoard$ = this.actions$.pipe(
    ofAction<ModifyBoard>(ModifyBoard),
    switchMap(action => {
      const ref = this.afs.collection<Board>('boards').doc(action.id);
      return from(ref.update(action.changes)).pipe(take(1));
    })
  );

  @Effect({ dispatch: false })
  removeBoard$ = this.actions$.pipe(
    ofAction<RemoveBoard>(RemoveBoard),
    switchMap(action => {
      const ref = this.afs.collection<Board>('boards').doc(action.id);
      return from(ref.delete()).pipe(take(1));
    })
  );

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
