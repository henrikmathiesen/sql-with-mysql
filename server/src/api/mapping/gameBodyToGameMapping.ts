import { GameDbo } from '../../db/dbo/GameDbo';

export const gameBodyToUserMapping = (gameBody: GameDbo, isPost: boolean) => { 
    const game = new GameDbo();
    game.name = gameBody.name;
    game.developer = gameBody.developer;
    game.publisher = gameBody.publisher;
    game.genre = gameBody.genre;
    game.releaseYear = gameBody.releaseYear;
    game.avarageRating = 0;

    if(isPost) {
        game.userId = gameBody.userId;
    }

    game.deleted = false;

    return game;
};
