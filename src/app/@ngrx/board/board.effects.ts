import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs/operators';

import { State } from '../reducers';
import { getRouterState } from '../router/router.selectors';
import { BoardSelected } from './board.actions';

@Injectable()
export class BoardEffects {
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

  constructor(private router: Router, private store: Store<State>) {}
}
