import { DbTableEnum } from './GetDbTableConstants';

interface IColumnConstants {
    id: string;
    deleted: string;
}

export interface IGamesColumnConstants extends IColumnConstants {
    name: string;
    developer: string;
    publisher: string;
    genre: string;
    releaseYear: string;
    avarageRating: string;
    userId: string;
}

export interface IReviewsColumnConstants extends IColumnConstants {
    header: string;
    body: string;
    rating: string;
    gameId: string;
    userId: string;
}

export interface IUsersColumnConstants extends IColumnConstants {
    name: string;
    email: string;
    registered: string;
}

export const getDbColumnConstants = (tableName: DbTableEnum): IColumnConstants => {
    switch (tableName) {
        case DbTableEnum.games: {
            return <IGamesColumnConstants>{
                id: 'id',
                name: 'name',
                developer: 'developer',
                publisher: 'publisher',
                genre: 'genre',
                releaseYear: 'releaseYear',
                avarageRating: 'avarageRating',
                deleted: 'deleted',
                userId: 'userId'
            };
        }
        case DbTableEnum.reviews: {
            return <IReviewsColumnConstants>{
                id: 'id',
                header: 'header',
                body: 'body',
                rating: 'rating',
                deleted: 'deleted',
                gameId: 'gameId',
                userId: 'userId'
            };
        }
        case DbTableEnum.users: {
            return <IUsersColumnConstants>{
                id: 'id',
                name: 'name',
                email: 'email',
                registered: 'registered',
                deleted: 'deleted'
            };
        }
    }
}
