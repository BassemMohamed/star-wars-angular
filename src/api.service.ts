import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, forkJoin, map } from 'rxjs';
import { CharacterRes } from './models/character.model';
import { MovieRes } from './models/movie.model';

interface ListResponse<T> {
  count: number;
  results: T[];
}

@Injectable({ providedIn: 'root' })
export default class ApiService {
  private BASE_URL = 'https://swapi.dev/api/';

  constructor(private httpClient: HttpClient) {}

  // Returns list of movies from API.
  public getMoviesList(): Observable<MovieRes[]> {
    return this.httpClient
      .get<ListResponse<MovieRes>>(`${this.BASE_URL}films`)
      .pipe(map((res) => res.results));
  }

  // Returns a list of movies from API given the movie IDs.
  public getMovies(ids: number[]): Observable<MovieRes[]> {
    const requests = ids.map((id) =>
      this.httpClient.get<MovieRes>(`${this.BASE_URL}films/${id}`)
    );

    return combineLatest(requests).pipe(map((res) => res as MovieRes[]));
  }

  // Returns a list of characters from API given the character IDs.
  public getCharacters(ids: number[]): Observable<CharacterRes[]> {
    const requests = ids.map((id) =>
      this.httpClient.get<CharacterRes>(`${this.BASE_URL}people/${id}`)
    );

    return forkJoin(requests).pipe(map((res) => res as CharacterRes[]));
  }
}
