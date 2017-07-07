import { GameDbo } from '../../db/dbo/GameDbo';

export interface IGameBody {
    name:string;
    developer:string;
    publisher: string;
    genre:string;
    releaseYear:number;
    userId:number;
}

const gameBodyToGameMapping = (gameBody: IGameBody, isCreated: boolean) => {
    const game = new GameDbo();
    game.name = gameBody.name;
    game.developer = gameBody.developer;
    game.publisher = gameBody.publisher;
    game.genre = gameBody.genre;
    game.releaseYear = gameBody.releaseYear;

    if (isCreated) {
        game.avarageRating = 0;
        game.userId = gameBody.userId;
        game.deleted = false;
    }

    return game;
};

export const createdGameBodyToGameMapping = (gameBody: IGameBody) => {
    return gameBodyToGameMapping(gameBody, true);
};

export const updatedGameBodyToGameMapping = (gameBody: IGameBody) => {
    return gameBodyToGameMapping(gameBody, false);
};
