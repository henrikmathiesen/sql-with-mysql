import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const getReviewById = (id: number, doneCb) => {
    const reviewsTable = getDbTableConstants(DbTableEnum.reviews);

    const sql = `
        SELECT * FROM ${reviewsTable}
        WHERE id = ?
    `;

    getDbConnection().query(sql, [id], (error: IError, review: ReviewDbo) => {
        if (error) {
            throw error;
        }
        else {
            doneCb(review);
        }
    });
};
