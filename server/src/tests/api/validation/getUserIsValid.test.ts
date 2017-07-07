import { getUserIsValid } from '../../../api/validation/getUserIsValid';

describe('It validates a user', () => {

    describe('By checking property types', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: 2,                                // invalid
                email: 'foo@bar.baz'
            };

            expect(getUserIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                name: 'foo',
                email: 2                                // invalid
            };

            expect(getUserIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('By checking has no empty values', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: '',                               // invalid
                email: 'foo@bar.baz'
            };

            expect(getUserIsValid(jsonUserPost as any)).toEqual(false);
        });

        it('Sample B', () => {
            const jsonUserPost = {
                name: 'foo',
                email: ''                               // invalid
            };

            expect(getUserIsValid(jsonUserPost as any)).toEqual(false);
        });
    });

    describe('A valid user', () => { 
        it('Sample A', () => {
            const jsonUserPost = {
                name: 'foo',
                email: 'foo@bar.baz'
            };

            expect(getUserIsValid(jsonUserPost as any)).toEqual(true);
        });
    });

});
