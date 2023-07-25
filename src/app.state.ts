import { AppState } from './models/app.model';

const INITIAL_STATE: AppState = {
  loading: true,
  error: null,
  movies: [],
  characters: [],
};

export { INITIAL_STATE };
