import { getReviewIsValid } from 'api/validation/getReviewIsValid';

describe('It validates a review', () => {

    describe('By checking property types', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: '10',                           // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: 10,
                gameId: '1',                            // invalid
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('By checking has no empty values', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                header: '',                             // invalid
                body: 'some body',
                rating: 10,
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                header: 'some header',
                body: null,                             // invalid
                rating: 10,
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample C', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: 10,
                gameId: undefined,                         // invalid
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('By checking that rating is 1-10', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: 11,                                 // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: 10.5,                               // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample C', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: 0,                                  // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample D', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: -4,                                  // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample E', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                                                            // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample F', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: undefined,                          // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample G', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: null,                               // invalid
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('A valid review', () => { 
        it('Sample A', () => {
            const jsonUserPost = {
                header: 'some header',
                body: 'some body',
                rating: 8,
                gameId: 1,
                userId: 1
            };

            expect(getReviewIsValid(jsonUserPost as any)).toEqual(true);
        });
    });

});
