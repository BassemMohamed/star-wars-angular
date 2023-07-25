import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './models/app.model';

class AppSelector {
  public selectState = createFeatureSelector<AppState>('app');

  public selectLoading = createSelector(
    this.selectState,
    (state: AppState) => state.loading
  );

  public selectError = createSelector(
    this.selectState,
    (state: AppState) => state.error
  );

  public selectMovies = createSelector(
    this.selectState,
    (state: AppState) => state.movies
  );

  public selectCharacters = createSelector(
    this.selectState,
    (state: AppState) => state.characters
  );

  public selectMovie(id: string) {
    return createSelector(this.selectMovies, (movies) =>
      movies.find((m) => m.url === `https://swapi.dev/api/films/${id}/`)
    );
  }

  public selectCharacter(id: string) {
    return createSelector(this.selectCharacters, (characters) =>
      characters.find((ch) => ch.url === `https://swapi.dev/api/people/${id}/`)
    );
  }

  public selectMoviesByUrls(urls: string[]) {
    return createSelector(this.selectMovies, (movies) =>
      movies.filter((movie) => urls.includes(movie.url))
    );
  }

  public selectCharactersByUrls(urls: string[]) {
    return createSelector(this.selectCharacters, (characters) =>
      characters.filter((character) => urls.includes(character.url))
    );
  }
}

export const appSelector = new AppSelector();
