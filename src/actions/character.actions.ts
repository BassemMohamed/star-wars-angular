import { createAction, props } from '@ngrx/store';
import { CharacterRes } from 'src/models/character.model';

class CharacterActions {
  public loadCharacters = createAction(
    '[Character] Load Character',
    props<{ ids: number[] }>()
  );
  public loadCharactersSuccess = createAction(
    '[Character] Load Characters Success',
    props<{ results: CharacterRes[] }>()
  );
  public loadCharactersFailure = createAction(
    '[Character] Load Character Failure',
    props<{ error: unknown }>()
  );
}

const characterActions = new CharacterActions();

export default characterActions;
