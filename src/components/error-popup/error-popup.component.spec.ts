import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import AppReducer from 'src/app.reducer';
import { ErrorPopupComponent } from './error-popup.component';
import movieActions from 'src/actions/movie.actions';

describe('ErrorPopupComponent', () => {
  let spectator: Spectator<ErrorPopupComponent>;
  let component: ErrorPopupComponent;
  let store: Store;

  const factory = createComponentFactory({
    component: ErrorPopupComponent,
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

  it('should display error message', () => {
    store.dispatch(
      movieActions.loadMoviesFailure({ error: { message: 'error' } })
    );
    spectator.detectChanges();

    expect('.container').toExist();
  });
});
