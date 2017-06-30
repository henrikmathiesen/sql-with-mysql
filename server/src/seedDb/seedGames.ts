import { GameDbo } from '../db/dbo/GameDbo';
import { UserDbo } from '../db/dbo/UserDbo';
import { getGameGenreConstants, GameGenresEnum } from '../common/getGameGenreConstants';
import { createGameQuery } from '../db/queries/games/createGameQuery';

export const seedGames = (addedByUser: UserDbo) => { 
    return new Promise((resolve, reject) => { 
        const games = new Array<GameDbo>();

        const game01 = new GameDbo();
        game01.name = 'Fallout New Vegas';
        game01.developer = 'Obsidian';
        game01.publisher = 'Bethesda';
        game01.genre = getGameGenreConstants(GameGenresEnum.roleplaying);
        game01.releaseYear = 2010;
        game01.avarageRating = 10;
        game01.userId = addedByUser.id;
        game01.deleted = false;

        const game02 = new GameDbo();
        game02.name = 'Witcher 3';
        game02.developer = 'CD Project';
        game02.publisher = 'CD Project';
        game02.genre = getGameGenreConstants(GameGenresEnum.roleplaying);
        game02.releaseYear = 2015;
        game02.avarageRating = 10;
        game02.userId = addedByUser.id;
        game02.deleted = false;

        games.push(game01);
        games.push(game02);

        Promise.all(games.map(createGameQuery))
            .then(resolve)
            .catch(reject);
    });
};
