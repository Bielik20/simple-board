import { ListFull } from './../lists/list.model';

export interface Board {
  id: string;
  name: string;
}

export interface BoardFull extends Board {
  lists: ListFull[];
}
