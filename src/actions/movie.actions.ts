import { createAction, props } from '@ngrx/store';
import { MovieRes } from 'src/models/movie.model';

class MovieActions {
  public loadMovies = createAction(
    '[Movie] Load Movies',
    props<{ ids?: number[] }>()
  );
  public loadMoviesSuccess = createAction(
    '[Movie] Load Movies Success',
    props<{ results: MovieRes[] }>()
  );
  public loadMoviesFailure = createAction(
    '[Movie] Load Movies Failure',
    props<{ error: unknown }>()
  );
}

const movieActions = new MovieActions();

export default movieActions;
