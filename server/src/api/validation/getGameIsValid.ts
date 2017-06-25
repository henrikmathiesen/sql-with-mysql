import { GameDbo } from '../../db/dbo/GameDbo';
import { getGameGenreConstants, GameGenresEnum } from '../../common/getGameGenreConstants';

export const getGameIsInvalidMessage = 'Invalid game';

export const getGameIsValid = (game: GameDbo) => {
    const nameIsAString = typeof game.name === 'string';
    const developerIsAString = typeof game.developer === 'string';
    const publisherIsAString = typeof game.publisher === 'string';
    const releaseYearIsANumber = typeof game.releaseYear === 'number';
    const userIdIsANumber = typeof game.userId === 'number';

    const genreIsAction = game.genre == getGameGenreConstants(GameGenresEnum.action);
    const genreIsRoleplaying = game.genre == getGameGenreConstants(GameGenresEnum.roleplaying);
    const genreIsSport = game.genre == getGameGenreConstants(GameGenresEnum.sport);
    const genreIsStrategy = game.genre == getGameGenreConstants(GameGenresEnum.strategy);

    const nameIsNotEmpty = game.name;
    const developerIsNotEmpty = game.developer;
    const publisherIsNotEmpty = game.publisher;
    const releaseYearIsNotEmpty = game.releaseYear;
    const userIdIsNotEmpty = game.userId;

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
