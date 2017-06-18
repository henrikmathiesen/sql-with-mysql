import { DbTableEnum } from './GetDbTableConstants';

interface IColumnsConstants {
    id: string;
}

export interface IGamesColumnsConstants extends IColumnsConstants {
    name: string;
    developer: string;
    publisher: string;
    releaseYear: string;
    avarageRating: string;
    userId: string;
}

export interface IReviewsColumnsConstants extends IColumnsConstants {
    header: string;
    body: string;
    rating: string;
    gameId: string;
    userId: string;
}

 export interface IUsersColumnsConstants extends IColumnsConstants {
    name: string;
    email: string;
    registered: string;
}

export class GetDbColumnsConstants {
    public static get(tableName: DbTableEnum): IColumnsConstants {
        switch (tableName) {
            case DbTableEnum.games: {
                return <IGamesColumnsConstants>{
                    id: 'id',
                    name: 'name',
                    developer: 'developer',
                    publisher: 'publisher',
                    releaseYear: 'releaseYear',
                    avarageRating: 'avarageRating',
                    userId: 'userId'
                };
            }
            case DbTableEnum.reviews: {
                return <IReviewsColumnsConstants>{
                    id: 'id',
                    header: 'header',
                    body: 'body',
                    rating: 'rating',
                    gameId: 'gameId',
                    userId: 'userId'
                };
            }
            case DbTableEnum.users: {
                return <IUsersColumnsConstants>{
                    id: 'id',
                    name: 'name',
                    email: 'email',
                    registered: 'registered'
                };
            }
        }
    }
}
