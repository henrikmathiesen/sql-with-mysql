import { GameDbo } from '../db/dbo/GameDbo';
import { UserDbo } from '../db/dbo/UserDbo';
import { getGameGenreConstants, GameGenresEnum } from '../common/getGameGenreConstants';
import { createEntityQuery } from '../db/queries/createEntityQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

export const seedGames = (addedByUsers: UserDbo[]) => {
    return new Promise((resolve, reject) => {
        const games = new Array<GameDbo>();

        const game01 = new GameDbo();
        game01.name = 'Fallout New Vegas';
        game01.developer = 'Obsidian';
        game01.publisher = 'Bethesda';
        game01.genre = getGameGenreConstants(GameGenresEnum.roleplaying);
        game01.releaseYear = 2010;
        game01.avarageRating = 10;
        game01.userId = addedByUsers[0].id;
        game01.deleted = false;

        const game02 = new GameDbo();
        game02.name = 'Witcher 3';
        game02.developer = 'CD Project';
        game02.publisher = 'CD Project';
        game02.genre = getGameGenreConstants(GameGenresEnum.roleplaying);
        game02.releaseYear = 2015;
        game02.avarageRating = 10;
        game02.userId = addedByUsers[1].id;
        game02.deleted = false;

        games.push(game01);
        games.push(game02);

        Promise.all(games.map((game) => {
            createEntityQuery(DbTableEnum.games, game);
        }))
            .then(resolve)
            .catch(reject);
    });
};
