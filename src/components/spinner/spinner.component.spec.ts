import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SpinnerComponent } from './spinner.component';
import { Store, StoreModule } from '@ngrx/store';
import AppReducer from 'src/app.reducer';
import movieActions from 'src/actions/movie.actions';

describe('SpinnerComponent', () => {
  let spectator: Spectator<SpinnerComponent>;
  let component: SpinnerComponent;
  let store: Store;

  const factory = createComponentFactory({
    component: SpinnerComponent,
    imports: [StoreModule.forRoot({ app: AppReducer })],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
    store = spectator.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner when loading is true', () => {
    expect('.container').toExist();
  });

  it('should not render spinner when loading is false', () => {
    store.dispatch(movieActions.loadMoviesSuccess({ results: [] }));
    spectator.detectChanges();

    expect('.container').not.toExist();
  });
});
