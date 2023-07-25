import { EntityStatus } from './app.model';

interface Character {
  // URL is used as the ID for the character as it is unique.
  url: string;
  // list of movies the character appeared in
  films: string[];
  // A status to keep track of the status of the character entity.
  status: EntityStatus;

  name: string;
  height: string;
  mass: string;
  gender: string;
}

/**
 * The character response from the API.
 * It is quite the same as our FE Character model, but with a few differences.
 *
 * 1. It doesn't include the status property.
 */
type CharacterRes = Omit<Character, 'status'>;

export { Character, CharacterRes };
