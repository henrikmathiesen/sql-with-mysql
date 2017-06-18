import GetUsersQuery from '../db/queries/GetUsersQuery';
import SeedUsers from './SeedUsers';

export default class SeedDb {
    public seed(): void {
        console.log('seedDb, seeding');

        const userQuery = new GetUsersQuery().query();
        userQuery.on('result', (row) => {
            console.log('user result', row);
            // if(!row) {
            //     SeedUsers.seed();
            // }
        });
    }
}
