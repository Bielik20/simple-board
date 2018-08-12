import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getSelectedBoardFull } from '../@ngrx/selectors';
import { BoardFull } from './../@ngrx/boards/board.model';
import { State } from './../@ngrx/reducers';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board$: Observable<BoardFull>;

  constructor(private store: Store<State>) {
    this.board$ = this.store.select(getSelectedBoardFull);
  }

  ngOnInit() {}
}
