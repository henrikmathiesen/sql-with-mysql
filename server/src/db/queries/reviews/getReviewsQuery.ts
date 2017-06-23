import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const getReviewsQuery = (doneCb) => {
    const table = getDbTableConstants(DbTableEnum.reviews);

    const sql = `
        SELECT * FROM ${table}
    `;

    getDbConnection().query(sql, (error: IError, reviews: ReviewDbo[]) => {
        if(error) {
            throw error;
        }
        else {
            doneCb(reviews);
        }
    });
};
