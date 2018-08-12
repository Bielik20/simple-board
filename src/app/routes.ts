import { BoardComponent } from './board/board.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: ':id', component: BoardComponent, data: { collection: 'boards' } }
];
