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
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPageComponent implements OnInit {
  public characterId = '';
  public character$: Observable<Character | undefined> | undefined;
  public movies$: Observable<Movie[] | undefined> | undefined;
  public EntityStatus = EntityStatus;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.characterId = params['id'].toString();
    });

    this.getCharacterData();
  }

  public getCharacterData(): void {
    this.character$ = this.store.pipe(
      select(appSelector.selectCharacter(this.characterId)),
      tap((character) => {
        if (!character) {
          this.loadCharacterFromApi();
        }
      }),
      filter((character) => !!character),
      tap((character) => this.getMoviesData(character as Character))
    );
  }

  public loadCharacterFromApi(): void {
    this.store.dispatch(
      characterActions.loadCharacters({ ids: [Number(this.characterId)] })
    );
  }

  public getMoviesData(character: Character): void {
    this.movies$ = this.store.pipe(
      select(appSelector.selectMoviesByUrls(character.films)),
      filter((movies) => !!movies),
      tap((movies) => {
        const emptyMovies = movies?.filter(
          (ch) => ch.status === EntityStatus.Empty
        );
        this.loadMoviesFromApi(emptyMovies);
      })
    );
  }

  public loadMoviesFromApi(emptyMovies: Movie[]): void {
    const ids = emptyMovies.map((m) => getIdFromUrl(m.url));

    this.store.dispatch(movieActions.loadMovies({ ids }));
  }

  public handleClick(url: string) {
    const id = getIdFromUrl(url);

    this.router.navigateByUrl(`/movie/${id}`);
  }
}
