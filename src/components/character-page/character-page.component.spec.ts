import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import AppReducer from 'src/app.reducer';
import { MOCK_CHARACTERS, MOCK_MOVIES } from 'src/data.mock';
import { CharacterRes } from 'src/models/character.model';
import { CharacterPageComponent } from './character-page.component';
import characterActions from 'src/actions/character.actions';
import movieActions from 'src/actions/movie.actions';

describe('CharacterPageComponent', () => {
  let spectator: Spectator<CharacterPageComponent>;
  let component: CharacterPageComponent;
  let store: Store;
  let router: Router;
  let dispatchSpy: jasmine.Spy;
  let mockCharacter: CharacterRes;

  const factory = createComponentFactory({
    component: CharacterPageComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 1 }),
        },
      },
    ],
    imports: [StoreModule.forRoot({ app: AppReducer }), RouterTestingModule],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
    store = spectator.inject(Store);
    router = spectator.inject(Router);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    // MOCK_MOVIES[0] is the movie with ID 1
    mockCharacter = MOCK_CHARACTERS[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get character ID from url', () => {
    expect(component.characterId).toBe('1');
  });

  it('should render character details', () => {
    store.dispatch(
      characterActions.loadCharactersSuccess({ results: [mockCharacter] })
    );
    spectator.detectChanges();

    expect('.name').toHaveText('Luke Skywalker');
    expect('.height').toHaveText('Height: 172');
    expect('.mass').toHaveText('Mass: 77');
    expect('.gender').toHaveText('Gender: male');
  });

  it('should dispatch an action to load movies', () => {
    store.dispatch(
      characterActions.loadCharactersSuccess({ results: [mockCharacter] })
    );
    spectator.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      movieActions.loadMovies({
        ids: [1, 2, 3, 6],
      })
    );
  });

  it('should render placeholders until movies are loaded', () => {
    store.dispatch(
      characterActions.loadCharactersSuccess({ results: [mockCharacter] })
    );
    spectator.detectChanges();

    expect('.grid .card.placeholder').toHaveLength(4);
  });

  it('should render movies when loaded', () => {
    store.dispatch(
      characterActions.loadCharactersSuccess({ results: [mockCharacter] })
    );
    store.dispatch(movieActions.loadMoviesSuccess({ results: MOCK_MOVIES }));
    spectator.detectChanges();

    expect('.grid .card').toHaveLength(4);
    expect('.grid .card.placeholder').toHaveLength(0);

    expect('.grid .card .title').toHaveText('A New Hope');
  });

  it('should route to movie details page on click', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    store.dispatch(
      characterActions.loadCharactersSuccess({ results: [mockCharacter] })
    );
    store.dispatch(movieActions.loadMoviesSuccess({ results: MOCK_MOVIES }));
    spectator.detectChanges();

    spectator.click('.card:first-child');

    expect(navigateSpy).toHaveBeenCalledWith('/movie/1');
  });
});
