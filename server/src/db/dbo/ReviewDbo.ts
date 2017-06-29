import { EntityDbo } from './EntityDbo';

export class ReviewDbo extends EntityDbo {
    header: string;
    body: string;
    rating: number;
    gameId: number;
    userId: number;
}
