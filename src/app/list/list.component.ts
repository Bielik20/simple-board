import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Card } from './../@ngrx/cards/card.model';
import { AddCard, ModifyCard } from './../@ngrx/cards/cards.actions';
import { ListFull } from './../@ngrx/lists/list.model';
import { State } from './../@ngrx/reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input()
  list: ListFull;
  displayAddCard = false;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }

  onEnter(value: string) {
    const card: Card = {
      title: value,
      order: this.getNextOrder(),
      listId: this.list.id,
      boardId: this.list.boardId
    };
    this.store.dispatch(new AddCard(card));
  }

  private getNextOrder(): number {
    const length = this.list.cards.length;
    if (length === 0) {
      return 1;
    }
    return this.list.cards[length - 1].order + 100;
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    const draggedCardId = $event.dataTransfer.getData('text');
    const targetId = $event.target.id;
    const targetClassName = $event.target.className;

    if (targetClassName === 'card') {
      return this.draggedOverCard(targetId, draggedCardId);
    }
    if (targetClassName === 'list__title') {
      return this.draggedOverListTitle(draggedCardId);
    }
    if (targetClassName === 'list__newcard') {
      return this.draggedOverListFoot(draggedCardId);
    }
  }

  private draggedOverCard(targetId: string, draggedCardId: string) {
    const targetIndex = this.list.cards.findIndex(card => card.id === targetId);
    const targetOrder = this.list.cards[targetIndex].order;
    const aboveOrder = this.getOrderAbove(targetId);
    const order = (targetOrder + aboveOrder) / 2;
    this.modifyCard(draggedCardId, order);
  }

  private draggedOverListTitle(draggedCardId: any) {
    if (this.list.cards.length > 0) {
      const firstCardOrder = this.list.cards[0].order;
      const order = firstCardOrder / 2;
      this.modifyCard(draggedCardId, order);
    } else {
      this.modifyCard(draggedCardId, 1);
    }
  }

  private draggedOverListFoot(draggedCardId: any) {
    const order = this.getNextOrder();
    this.modifyCard(draggedCardId, order);
  }

  private modifyCard(cardId: string, order: number) {
    this.store.dispatch(new ModifyCard(cardId, { listId: this.list.id, order }));
  }

  private getOrderAbove(cardId: string): number {
    const index = this.list.cards.findIndex(card => card.id === cardId);
    const cardAbove = this.getCardAbove(index);
    return cardAbove ? cardAbove.order : 0;
  }

  private getCardAbove(index: number): Card {
    if (index === -1 || index === 0) {
      return null;
    }
    return this.list.cards[index - 1];
  }
}
