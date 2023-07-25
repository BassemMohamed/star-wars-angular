import { createReducer, on } from '@ngrx/store';
import movieActions from 'src/actions/movie.actions';
import { INITIAL_STATE } from 'src/app.state';
import characterActions from './actions/character.actions';
import {
  createEmptyCharacters,
  createEmptyMovies,
  mergeEntities,
  parseCharacterResults,
  parseMovieResults,
} from './app.utils';
import { AppState } from './models/app.model';
import { Character, CharacterRes } from './models/character.model';
import { Movie, MovieRes } from './models/movie.model';

const handleLoadingMovies = (
  state: AppState,
  action: { results: MovieRes[] }
): AppState => {
  const { results } = action;

  // Parse the API response into array of movies.
  const movies = parseMovieResults(results) as Movie[];
  // Generate an array of empty characters based on the API response.
  const characters = createEmptyCharacters(results) as Character[];

  return {
    ...state,
    loading: false,
    movies: mergeEntities(state.movies, movies),
    characters: mergeEntities(state.characters, characters),
  };
};

const handleLoadingCharacters = (
  state: AppState,
  action: { results: CharacterRes[] }
): AppState => {
  const { results } = action;

  // Parse the API response into array of characters.
  const characters = parseCharacterResults(results) as Character[];
  // Generate an array of empty movies based on the API response.
  const movies = createEmptyMovies(results) as Movie[];

  return {
    ...state,
    loading: false,
    movies: mergeEntities(state.movies, movies),
    characters: mergeEntities(state.characters, characters),
  };
};

const AppReducer = createReducer(
  INITIAL_STATE,

  // Reduce failure actions
  on(movieActions.loadMoviesFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(characterActions.loadCharactersFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // Reduce success actions
  on(movieActions.loadMoviesSuccess, handleLoadingMovies),
  on(characterActions.loadCharactersSuccess, handleLoadingCharacters)
);

export default AppReducer;
