import { ReviewDbo } from 'db/dbo/ReviewDbo';
import { GameDbo } from 'db/dbo/GameDbo';

describe('It can calculate an avarage rating for a game, based on the games reviews', () => {

    let calculateGameAvarageRating;
    let getReviews;

    beforeEach(() => {
        calculateGameAvarageRating = {
            withForLoop: (reviews: ReviewDbo[]): number => {
                let gameAvarageRating = 0;

                if (reviews) {
                    for (let review = 0; review < reviews.length; review++) {
                        gameAvarageRating += reviews[review].rating;
                    }

                    gameAvarageRating = gameAvarageRating / reviews.length;
                    gameAvarageRating = Math.round(gameAvarageRating);
                }

                return gameAvarageRating;
            },
            withReduce: (reviews: ReviewDbo[]): number => {
                let gameAvarageRating = 0;

                if (reviews) {
                    const reviewScores = reviews.map(review => review.rating);
                    const reviewScoresSum = reviewScores.reduce((total, score) => total + score);
                    gameAvarageRating = Math.round(reviewScoresSum / reviews.length);
                }

                return gameAvarageRating;
            }
        };

        getReviews = {
            normal: () => {
                const review01 = new ReviewDbo();
                review01.rating = 1;

                const review02 = new ReviewDbo();
                review02.rating = 4;

                const review03 = new ReviewDbo();
                review03.rating = 10;

                const reviews = new Array<ReviewDbo>();
                reviews.push(review01);
                reviews.push(review02);
                reviews.push(review03);

                return reviews;
            },
            oddAvarage: () => {
                const review01 = new ReviewDbo();
                review01.rating = 1;

                const review02 = new ReviewDbo();
                review02.rating = 10;

                const reviews = new Array<ReviewDbo>();
                reviews.push(review01);
                reviews.push(review02);

                return reviews;
            }
        };
    });

    describe('Done with a for loop', () => {
        it('calculates the avarage rating', () => {
            let reviews = new Array<ReviewDbo>();
            reviews = getReviews.normal();

            // simulate how db query returns data
            reviews = reviews.length ? reviews : null;

            const game = new GameDbo();
            game.avarageRating = calculateGameAvarageRating.withForLoop(reviews);

            expect(game.avarageRating).toEqual(5);
        });

        it('calculates the avarage rating with a rounding upwards to nearest int', () => {
            let reviews = new Array<ReviewDbo>();
            reviews = getReviews.oddAvarage();

            // simulate how db query returns data
            reviews = reviews.length ? reviews : null;

            const game = new GameDbo();
            game.avarageRating = calculateGameAvarageRating.withForLoop(reviews);

            expect(game.avarageRating).not.toEqual(5.5);
            expect(game.avarageRating).toEqual(6);
        });

        it('sets avarage rating to zero if no reviews', () => {
            let reviews = new Array<ReviewDbo>();

            // simulate how db query returns data
            reviews = reviews.length ? reviews : null;

            const game = new GameDbo();
            game.avarageRating = calculateGameAvarageRating.withForLoop(reviews);

            expect(game.avarageRating).toEqual(0);
        });
    });

    describe('Done with .reduce', () => {
        it('calculates the avarage rating', () => {
            let reviews = new Array<ReviewDbo>();
            reviews = getReviews.normal();

            // simulate how db query returns data
            reviews = reviews.length ? reviews : null;

            const game = new GameDbo();
            game.avarageRating = calculateGameAvarageRating.withReduce(reviews);

            expect(game.avarageRating).toEqual(5);
        });

        it('calculates the avarage rating with a rounding upwards to nearest int', () => {
            let reviews = new Array<ReviewDbo>();
            reviews = getReviews.oddAvarage();

            // simulate how db query returns data
            reviews = reviews.length ? reviews : null;

            const game = new GameDbo();
            game.avarageRating = calculateGameAvarageRating.withReduce(reviews);

            expect(game.avarageRating).not.toEqual(5.5);
            expect(game.avarageRating).toEqual(6);
        });

        it('sets avarage rating to zero if no reviews', () => {
            let reviews = new Array<ReviewDbo>();

            // simulate how db query returns data
            reviews = reviews.length ? reviews : null;

            const game = new GameDbo();
            game.avarageRating = calculateGameAvarageRating.withReduce(reviews);

            expect(game.avarageRating).toEqual(0);
        });
    });

});
