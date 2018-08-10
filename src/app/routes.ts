import { BoardComponent } from './board/board.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: ':id', component: BoardComponent, data: { collection: 'boards' } }
];
