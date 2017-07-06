import { getUserIsValid } from '../../../api/validation/getUserIsValid';

describe('It validates a user', () => {

    describe('By checking property types', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: 2,
                email: 'foo@bar.baz'
            };

            expect(getUserIsValid(jsonUserPost as any)).toBeFalsy();
        });

        it('Sample B', () => {
            const jsonUserPost = {
                name: 'foo',
                email: 2
            };

            expect(getUserIsValid(jsonUserPost as any)).toBeFalsy();
        });
    });

    describe('By checking has no empty values', () => {
        it('Sample A', () => {
            const jsonUserPost = {
                name: '',
                email: 'foo@bar.baz'
            };

            expect(getUserIsValid(jsonUserPost as any)).toBeFalsy();
        });

        it('Sample B', () => {
            const jsonUserPost = {
                name: 'foo',
                email: ''
            };

            expect(getUserIsValid(jsonUserPost as any)).toBeFalsy();
        });
    });

    describe('A valid user', () => { 
        it('Sample A', () => {
            const jsonUserPost = {
                name: 'foo',
                email: 'foo@bar.baz'
            };

            expect(getUserIsValid(jsonUserPost as any)).toBeTruthy();
        });
    });

});
