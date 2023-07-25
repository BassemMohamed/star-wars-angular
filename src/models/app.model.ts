import { Character } from './character.model';
import { Movie } from './movie.model';

// An enum to keep track of the status of each entity.
enum EntityStatus {
  Loaded = 'loaded',
  Loading = 'loading',
  Empty = 'empty',
}

interface AppState {
  loading: boolean;
  error: unknown;
  movies: Movie[];
  characters: Character[];
}

export { AppState, EntityStatus };
