import { EntityDbo } from './EntityDbo';

export class GameDbo extends EntityDbo {
    name: string;
    developer: string;
    publisher: string;
    genre: string;
    releaseYear: number;
    avarageRating: number;
    userId: number;
}
