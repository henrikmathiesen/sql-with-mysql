export enum DbTableEnum {
    games,
    reviews,
    users
}

const getDbTableConstants = (tableName: DbTableEnum): string => {
    switch (tableName) {
        case DbTableEnum.games: {
            return 'games';
        }
        case DbTableEnum.reviews: {
            return 'reviews';
        }
        case DbTableEnum.users: {
            return 'users';
        }
    }
};
