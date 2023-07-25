import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import movieActions from 'src/actions/movie.actions';
import { appSelector } from 'src/app.selector';
import { getIdFromUrl } from 'src/app.utils';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit {
  public movies$ = this.store.pipe(select(appSelector.selectMovies));

  public constructor(private store: Store, private router: Router) {}

  public ngOnInit(): void {
    this.store.dispatch(movieActions.loadMovies({}));
  }

  public handleClick(url: string) {
    const id = getIdFromUrl(url);

    this.router.navigateByUrl(`/movie/${id}`);
  }
}
