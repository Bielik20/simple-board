import { Card } from '../cards/card.model';

export interface List {
  id: string;
  name: string;
  order: number;
  boardId: string;
}

export interface ListFull extends List {
  cards: Card[];
}
