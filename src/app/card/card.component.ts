import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Card } from '../@ngrx/cards/card.model';
import { RemoveCard } from './../@ngrx/cards/cards.actions';
import { State } from './../@ngrx/reducers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  deleteCard() {
    this.store.dispatch(new RemoveCard(this.card.id));
  }

  dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }
}
