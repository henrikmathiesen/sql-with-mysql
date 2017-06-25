import { GameDbo } from '../../db/dbo/GameDbo';

export const gameBodyToUserMapping = (gameBody: GameDbo) => { 
    const game = new GameDbo();
    game.name = gameBody.name;
    game.developer = gameBody.developer;
    game.publisher = gameBody.publisher;
    game.genre = gameBody.genre;
    game.releaseYear = gameBody.releaseYear;
    game.avarageRating = 0;
    game.userId = gameBody.userId;

    return game;
};
