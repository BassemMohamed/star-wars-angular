import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, tap } from 'rxjs';
import characterActions from 'src/actions/character.actions';
import movieActions from 'src/actions/movie.actions';
import { appSelector } from 'src/app.selector';
import { getIdFromUrl } from 'src/app.utils';
import { EntityStatus } from 'src/models/app.model';
import { Character } from 'src/models/character.model';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviePageComponent implements OnInit {
  public movieId = '';
  public movie$: Observable<Movie | undefined> | undefined;
  public characters$: Observable<Character[] | undefined> | undefined;
  public EntityStatus = EntityStatus;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.movieId = params['id'].toString();
    });

    this.getMovieData();
  }

  public getMovieData(): void {
    this.movie$ = this.store.pipe(
      select(appSelector.selectMovie(this.movieId)),
      tap((movie) => {
        if (!movie) {
          this.loadMovieFromApi();
        }
      }),
      filter((movie) => !!movie),
      tap((movie) => this.getCharactersData(movie as Movie))
    );
  }

  public loadMovieFromApi(): void {
    this.store.dispatch(
      movieActions.loadMovies({ ids: [Number(this.movieId)] })
    );
  }

  public getCharactersData(movie: Movie): void {
    this.characters$ = this.store.pipe(
      select(appSelector.selectCharactersByUrls(movie.characters)),
      filter((characters) => !!characters),
      tap((characters) => {
        const emptyCharacters = characters?.filter(
          (ch) => ch.status === EntityStatus.Empty
        );
        this.loadCharactersFromApi(emptyCharacters);
      })
    );
  }

  public loadCharactersFromApi(emptyCharacters: Character[]): void {
    const ids = emptyCharacters.map((ch) => getIdFromUrl(ch.url));

    this.store.dispatch(characterActions.loadCharacters({ ids }));
  }

  public handleClick(url: string) {
    const id = getIdFromUrl(url);

    this.router.navigateByUrl(`/character/${id}`);
  }
}
