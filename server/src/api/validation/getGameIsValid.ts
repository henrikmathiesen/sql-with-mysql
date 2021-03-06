import { IGameBody } from '../mapping/gameBodyToGameMapping';
import { getGameGenreConstants, GameGenresEnum } from '../../common/getGameGenreConstants';

export const gameIsInvalidMessage = 'Invalid game';

export const getGameIsValid = (game: IGameBody) => {
    const nameIsAString = typeof game.name === 'string';
    const developerIsAString = typeof game.developer === 'string';
    const publisherIsAString = typeof game.publisher === 'string';
    const releaseYearIsANumber = typeof game.releaseYear === 'number';
    const userIdIsANumber = typeof game.userId === 'number';

    const genreIsAction = game.genre == getGameGenreConstants(GameGenresEnum.action);
    const genreIsRoleplaying = game.genre == getGameGenreConstants(GameGenresEnum.roleplaying);
    const genreIsSport = game.genre == getGameGenreConstants(GameGenresEnum.sport);
    const genreIsStrategy = game.genre == getGameGenreConstants(GameGenresEnum.strategy);

    const nameIsNotEmpty = Boolean(game.name);
    const developerIsNotEmpty =  Boolean(game.developer);
    const publisherIsNotEmpty = Boolean(game.publisher);
    const releaseYearIsNotEmpty = Boolean(game.releaseYear);
    const userIdIsNotEmpty = Boolean(game.userId);

    const hasValidTypes = nameIsAString &&
        developerIsAString &&
        publisherIsAString &&
        releaseYearIsANumber &&
        userIdIsANumber;

    const hasValidGenre = genreIsAction ||
        genreIsRoleplaying ||
        genreIsSport ||
        genreIsStrategy;

    const hasNoEmptyValues = nameIsNotEmpty &&
        developerIsNotEmpty &&
        publisherIsNotEmpty &&
        releaseYearIsNotEmpty &&
        userIdIsNotEmpty;

    return hasValidTypes && hasValidGenre && hasNoEmptyValues;
};
