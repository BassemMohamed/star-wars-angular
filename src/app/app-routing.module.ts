import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CharacterPageComponent,
  MoviePageComponent,
  MoviesListComponent,
} from 'src/components';

const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent,
  },
  {
    path: 'movie/:id',
    component: MoviePageComponent,
  },
  {
    path: 'character/:id',
    component: CharacterPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
