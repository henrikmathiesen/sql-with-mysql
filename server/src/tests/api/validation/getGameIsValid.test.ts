import { getGameIsValid } from 'api/validation/getGameIsValid';

describe('It validates a game', () => {

    describe('By checking property types', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: 'some game',
                developer: 'some dev',
                publisher: 'some publisher',
                releaseYear: 1910,
                userId: '1',                            // invalid
                genre: 'Action'
            };

            expect(getGameIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                name: 'some game',
                developer: 'some dev',
                publisher: 'some publisher',
                releaseYear: '1910',                    // invalid
                userId: 1,
                genre: 'Action'
            };

            expect(getGameIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('By checking for valid genre', () => {
        it('Sample A', () => { 
            const jsonUserPost = {
                name: 'some game',
                developer: 'some developer',
                publisher: 'some publisher',
                releaseYear: 1910,
                userId: 1,
                genre: 'Drama'                          // invalid
            };
        });

        it('Sample B', () => { 
            const jsonUserPost = {
                name: 'some game',
                developer: 'some developer',
                publisher: 'some publisher',
                releaseYear: 1910,
                userId: 1,
                genre: 'action'                         // invalid (case sensitive)
            };
        });
    });

    describe('By checking has no empty values', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: 'some game',
                developer: '',                          // invalid
                publisher: 'some publisher',
                releaseYear: 1910,
                userId: 1,
                genre: 'Action'
            };

            expect(getGameIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                name: 'some game',
                developer: 'some developer',
                publisher: null,                        // invalid
                releaseYear: 1910,
                userId: 1,
                genre: 'Action'
            };

            expect(getGameIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample C', () => {
            const jsonUserPost = {
                name: undefined,                        // invalid
                developer: 'some developer',
                publisher: 'some publisher',
                releaseYear: 1910,
                userId: 1,
                genre: 'Action'
            };

            expect(getGameIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('A valid game', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: 'some game',
                developer: 'some dev',
                publisher: 'some publisher',
                releaseYear: 1910,
                userId: 1,
                genre: 'Action'
            };

            expect(getGameIsValid(jsonUserPost as any)).toEqual(true);
        });
    });

});
