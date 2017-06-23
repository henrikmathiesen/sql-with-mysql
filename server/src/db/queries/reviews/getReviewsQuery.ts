import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const getReviewsQuery = (doneCb) => {
    const reviewsTable = getDbTableConstants(DbTableEnum.reviews);

    const sql = `
        SELECT * FROM ${reviewsTable}
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
