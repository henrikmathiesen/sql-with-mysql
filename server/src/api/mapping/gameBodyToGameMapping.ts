import { GameDbo } from '../../db/dbo/GameDbo';

const gameBodyToUserMapping = (gameBody: GameDbo, isCreated: boolean) => {
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

export const createdGameBodyToUserMapping = (gameBody: GameDbo) => {
    return gameBodyToUserMapping(gameBody, true);
};

export const updatedGameBodyToUserMapping = (gameBody: GameDbo) => {
    return gameBodyToUserMapping(gameBody, false);
};
