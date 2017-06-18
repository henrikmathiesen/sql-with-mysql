export enum DbTableEnum {
    games,
    reviews,
    users
}

export class GetDbTableConstants {
    public static get(tableName: DbTableEnum): string {
        switch(tableName) {
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
    }
}
