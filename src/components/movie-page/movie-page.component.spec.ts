import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import characterActions from 'src/actions/character.actions';
import movieActions from 'src/actions/movie.actions';
import AppReducer from 'src/app.reducer';
import { MOCK_CHARACTERS, MOCK_MOVIES } from 'src/data.mock';
import { MovieRes } from 'src/models/movie.model';
import { MoviePageComponent } from './movie-page.component';

describe('MoviePageComponent', () => {
  let spectator: Spectator<MoviePageComponent>;
  let component: MoviePageComponent;
  let store: Store;
  let router: Router;
  let dispatchSpy: jasmine.Spy;
  let mockMovie: MovieRes;

  const factory = createComponentFactory({
    component: MoviePageComponent,
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
    mockMovie = MOCK_MOVIES[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movie ID from url', () => {
    expect(component.movieId).toBe('1');
  });

  it('should render movie details', () => {
    store.dispatch(movieActions.loadMoviesSuccess({ results: [mockMovie] }));
    spectator.detectChanges();

    expect('.title').toHaveText('A New Hope');
    expect('.director').toHaveText('Director: George Lucas');
    expect('.producer').toHaveText('Producer: Gary Kurtz, Rick McCallum');
    expect('.release-date').toHaveText('Release date: 1977-05-25');
  });

  it('should dispatch an action to load characters', () => {
    store.dispatch(movieActions.loadMoviesSuccess({ results: [mockMovie] }));
    spectator.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      characterActions.loadCharacters({
        ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 81],
      })
    );
  });

  it('should render placeholders until characters are loaded', () => {
    store.dispatch(movieActions.loadMoviesSuccess({ results: [mockMovie] }));
    spectator.detectChanges();

    expect('.grid .card.placeholder').toHaveLength(18);
  });

  it('should render characters when loaded', () => {
    store.dispatch(movieActions.loadMoviesSuccess({ results: [mockMovie] }));
    store.dispatch(
      characterActions.loadCharactersSuccess({ results: MOCK_CHARACTERS })
    );
    spectator.detectChanges();

    expect('.grid .card').toHaveLength(18);
    expect('.grid .card.placeholder').toHaveLength(16);

    expect('.grid .card .name').toHaveText('Luke Skywalker');
  });

  it('should route to character details page on click', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    store.dispatch(movieActions.loadMoviesSuccess({ results: [mockMovie] }));
    store.dispatch(
      characterActions.loadCharactersSuccess({ results: MOCK_CHARACTERS })
    );
    spectator.detectChanges();

    spectator.click('.card:first-child');

    expect(navigateSpy).toHaveBeenCalledWith('/character/1');
  });
});
