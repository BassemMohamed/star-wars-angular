import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { MockComponents } from 'ng-mocks';
import { ErrorPopupComponent, SpinnerComponent } from 'src/components';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const factory = createComponentFactory({
    component: AppComponent,
    declarations: [MockComponents(SpinnerComponent, ErrorPopupComponent)],
    imports: [RouterTestingModule],
  });

  beforeEach(() => {
    spectator = factory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    expect('header').toExist();
  });
});
