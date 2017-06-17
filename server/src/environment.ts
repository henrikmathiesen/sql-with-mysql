export const isProduction = process.env.NODE_ENV === 'production';

export const tables = {
    games: 'games',
    reviews: 'reviews',
    users: 'users'
};

export const columns = {
    games: {
        name: 'Name',
        developer: 'Developer',
        publisher: 'Publisher',
        releaseYear: 'ReleaseYear',
        avarageRating: 'AvarageRating',
        userId: 'UserId'
    },
    reviews: {
        header: 'Header',
        body: 'Body',
        rating: 'Rating',
        gameId: 'GameId',
        userId: 'UserId'
    },
    users: {
        name: 'Name',
        email: 'Email',
        registred: 'Registred'
    }
};
