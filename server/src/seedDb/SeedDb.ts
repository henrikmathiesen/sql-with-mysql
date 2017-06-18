import GetUsersQuery from '../db/queries/GetUsersQuery';
import SeedUsers from './SeedUsers';

export default class SeedDb {
    public static seed():void {
        const userQuery = new GetUsersQuery().query();
        userQuery.on('result', (row) => {
            console.log(row);
            // if(!row) {
            //     SeedUsers.seed();
            // }
        });
    }
}
