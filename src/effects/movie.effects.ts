import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import movieActions from 'src/actions/movie.actions';
import ApiService from 'src/api.service';

@Injectable()
export class MovieEffects {
  public constructor(
    private apiService: ApiService,
    private actions: Actions
  ) {}

  /**
   * This effect loads the movies list from the API.
   *
   * If the IDs are provided, it will load the movies with the given IDs.
   * If the IDs are not provided, it will load the movies list.
   */
  public loadMoviesList$ = createEffect(() =>
    this.actions.pipe(
      ofType(movieActions.loadMovies),
      switchMap((action) => {
        const request = action.ids
          ? this.apiService.getMovies(action.ids)
          : this.apiService.getMoviesList();

        return request.pipe(
          map((results) => movieActions.loadMoviesSuccess({ results })),
          catchError((err) => of(movieActions.loadMoviesFailure(err)))
        );
      })
    )
  );
}
