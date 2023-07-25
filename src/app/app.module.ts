import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import AppReducer from 'src/app.reducer';
import {
  CharacterPageComponent,
  ErrorPopupComponent,
  MoviePageComponent,
  MoviesListComponent,
  SpinnerComponent,
} from 'src/components';
import { CharacterEffects } from 'src/effects/character.effects';
import { MovieEffects } from 'src/effects/movie.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterPageComponent,
    ErrorPopupComponent,
    MoviePageComponent,
    MoviesListComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ app: AppReducer }),
    EffectsModule.forRoot([MovieEffects, CharacterEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
