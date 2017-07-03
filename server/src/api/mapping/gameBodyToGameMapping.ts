import { GameDbo } from '../../db/dbo/GameDbo';

const gameBodyToGameMapping = (gameBody: GameDbo, isCreated: boolean) => {
    const game = new GameDbo();
    game.name = gameBody.name;
    game.developer = gameBody.developer;
    game.publisher = gameBody.publisher;
    game.genre = gameBody.genre;
    game.releaseYear = gameBody.releaseYear;
    game.avarageRating = 0;

    if (isCreated) {
        game.userId = gameBody.userId;
    }

    game.deleted = false;

    return game;
};

export const createdGameBodyToGameMapping = (gameBody: GameDbo) => {
    return gameBodyToGameMapping(gameBody, true);
};

export const updatedGameBodyToGameMapping = (gameBody: GameDbo) => {
    return gameBodyToGameMapping(gameBody, false);
};
