import { EntityStatus } from './app.model';

/**
 * TODO: Create a serializer that replaces snake_case properties with camelCase.
 */
interface Movie {
  // URL is used as the ID for the movie as it is unique.
  url: string;
  // List of characters that appeared in the movie.
  characters: string[];
  // A status to keep track of the status of the movie entity.
  status: EntityStatus;

  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

/**
 * The movie response from the API.
 * It is quite the same as our FE Movie model, but with differences.
 *
 * 1. It doesn't include the status property.
 */
type MovieRes = Omit<Movie, 'status'>;

export { Movie, MovieRes };
