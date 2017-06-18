export const tables = {
    games: 'games',
    reviews: 'reviews',
    users: 'users'
};

export const columns = {
    games: {
        name: 'name',
        developer: 'developer',
        publisher: 'publisher',
        releaseYear: 'releaseYear',
        avarageRating: 'avarageRating',
        userId: 'userId'
    },
    reviews: {
        header: 'header',
        body: 'body',
        rating: 'rating',
        gameId: 'gameId',
        userId: 'userId'
    },
    users: {
        name: 'name',
        email: 'email',
        registered: 'registered'
    }
};
