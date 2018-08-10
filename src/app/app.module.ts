import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { BoardEffects } from './@ngrx/board/board.effects';
import { BoardsEffects } from './@ngrx/board/boards/boards.effects';
import { CardsEffects } from './@ngrx/cards/cards.effects';
import { ListsEffects } from './@ngrx/list/lists/lists.effects';
import { metaReducers, reducerProvider, reducerToken } from './@ngrx/reducers';
import { CustomRouterStateSerializer } from './@ngrx/router/router.serializer';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { ROUTES } from './routes';

@NgModule({
  declarations: [AppComponent, BoardComponent, CardComponent, ListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducerToken, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Simple Board',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([BoardEffects, CardsEffects, ListsEffects, BoardsEffects]),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFirestore,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    reducerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
