import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import characterActions from 'src/actions/character.actions';
import ApiService from 'src/api.service';

@Injectable()
export class CharacterEffects {
  public constructor(
    private apiService: ApiService,
    private actions: Actions
  ) {}

  /**
   * This effect loads the characters from the API given their IDs.
   */
  public loadCharactersList$ = createEffect(() =>
    this.actions.pipe(
      ofType(characterActions.loadCharacters),
      switchMap((action) => {
        return this.apiService.getCharacters(action.ids).pipe(
          map((results) => characterActions.loadCharactersSuccess({ results })),
          catchError((err) => of(characterActions.loadCharactersFailure(err)))
        );
      })
    )
  );
}
