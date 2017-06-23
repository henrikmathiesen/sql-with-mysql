export enum GameGenresEnum {
    action,
    roleplaying,
    sport,
    strategy
}

export const getGameGenreConstants = (gameGenreName: GameGenresEnum): string => {
    switch (gameGenreName) {
        case GameGenresEnum.action: {
            return 'Action';
        }
        case GameGenresEnum.roleplaying: {
            return 'Roleplaying';
        }
        case GameGenresEnum.sport: {
            return 'Sport';
        }
        case GameGenresEnum.strategy: {
            return 'Strategy';
        }
    }
};
