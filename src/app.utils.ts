import { EntityStatus } from './models/app.model';
import { Character, CharacterRes } from './models/character.model';
import { Movie, MovieRes } from './models/movie.model';

function getIdFromUrl(url: string): number {
  const urlArray = url.split('/');

  // Last element is an empty string.
  urlArray.pop();

  return Number(urlArray.pop());
}

// Transform the API response into the Movie model.
// This function appends the loaded status.
function parseMovieResults(results: MovieRes[]): Partial<Movie>[] {
  const movies: Partial<Movie>[] = [];

  results.forEach((result) => {
    movies.push({
      ...result,
      status: EntityStatus.Loaded,
    });
  });

  return movies;
}

function createEmptyCharacters(results: MovieRes[]): Partial<Character>[] {
  const characters: Partial<Character>[] = [];

  results.forEach((result) => {
    result.characters.forEach((url) => {
      characters.push({
        url,
        status: EntityStatus.Empty,
      });
    });
  });

  return characters;
}

// Transform the API response into the Movie model.
// This function appends the loaded status.
function parseCharacterResults(results: CharacterRes[]): Partial<Character>[] {
  const characters: Partial<Character>[] = [];

  results.forEach((result) => {
    characters.push({
      ...result,
      status: EntityStatus.Loaded,
    });
  });

  return characters;
}

function createEmptyMovies(results: CharacterRes[]): Partial<Movie>[] {
  const movies: Partial<Movie>[] = [];

  results.forEach((result) => {
    result.films.forEach((url) => {
      movies.push({
        url,
        status: EntityStatus.Empty,
      });
    });
  });

  return movies;
}

/**
 * This is quite a complex function, so let's break it down.
 *
 * Merges two lists of entites into one list without duplicates. If a duplicate is found,
 * This function will try and keep the entity with status loaded and ignore the other one.
 * It could be that a duplicate is found and both have status empty, in that case,
 * it doesn't matter which one is kept.
 *
 * The url is used as the ID for the entity as it is unique.
 */
function mergeEntities<T extends { url: string; status: EntityStatus }>(
  entitiesA: T[],
  entitiesB: T[]
): T[] {
  // A JS map with the url as key and the entity as value.
  const entityMap = new Map<string, T>();
  // Both the lists in one array. This array can have duplicates.
  const items = [...entitiesA, ...entitiesB];

  items.forEach((item) => {
    const entity = entityMap.get(item.url);

    // If the entity is not in the map, add it.
    if (!entity) {
      entityMap.set(item.url, item);
      return;
    }

    /**
     * If the entity is in the map, try & set the entity with status loaded.
     * It can be that both have status empty, in that case, it doesn't matter which one is
     * set.
     */
    if (entity) {
      const loadedEntity =
        entity.status === EntityStatus.Loaded ? entity : item;

      entityMap.set(entity.url, loadedEntity);
    }
  });

  return Array.from(entityMap.values());
}

export {
  createEmptyCharacters,
  createEmptyMovies,
  getIdFromUrl,
  mergeEntities,
  parseCharacterResults,
  parseMovieResults,
};
