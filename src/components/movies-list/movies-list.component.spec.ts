import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import movieActions from 'src/actions/movie.actions';
import AppReducer from 'src/app.reducer';
import { MOCK_MOVIES } from 'src/data.mock';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let spectator: Spectator<MoviesListComponent>;
  let component: MoviesListComponent;
  let store: Store;
  let router: Router;

  const factory = createComponentFactory({
    component: MoviesListComponent,
    imports: [StoreModule.forRoot({ app: AppReducer }), RouterTestingModule],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
    store = spectator.inject(Store);
    router = spectator.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of movies', () => {
    store.dispatch(movieActions.loadMoviesSuccess({ results: MOCK_MOVIES }));
    spectator.detectChanges();

    expect('.card').toHaveLength(6);
    expect('.card .title').toExist();
    expect('.card .director').toExist();
    expect('.card .producer').toExist();
    expect('.card .release-data').toExist();
    expect('.card .opening-crawl').toExist();
  });

  it('should route to movie details page on click', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    store.dispatch(movieActions.loadMoviesSuccess({ results: MOCK_MOVIES }));
    spectator.detectChanges();

    spectator.click('.card:first-child');

    expect(navigateSpy).toHaveBeenCalledWith('/movie/1');
  });
});
