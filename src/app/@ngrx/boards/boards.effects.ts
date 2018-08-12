import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { ofAction } from 'ngrx-actions/dist';
import { from } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { getRouterState } from '../router/router.selectors';
import { State } from './../reducers';
import { Board } from './board.model';
import { AddBoard, BoardAdded, BoardSelected, ModifyBoard, RemoveBoard } from './boards.actions';

@Injectable()
export class BoardsEffects {
  routerState$ = this.store.select(getRouterState);

  @Effect()
  selectClient$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    withLatestFrom(this.routerState$),
    map(([event, state]) => state),
    filter(state => !!state),
    filter(route => route.data.collection === 'boards'),
    map(route => route.params.id),
    distinctUntilChanged(),
    map(id => new BoardSelected(id || null))
  );

  @Effect()
  loadBoard$ = this.actions$.pipe(
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

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private router: Router,
    private store: Store<State>
  ) {}
}
