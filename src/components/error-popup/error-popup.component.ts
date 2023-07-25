import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { appSelector } from 'src/app.selector';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPopupComponent {
  public error$ = this.store.pipe(select(appSelector.selectError));

  constructor(private store: Store) {}
}
