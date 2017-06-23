import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const getReviewById = (id: number, doneCb) => {
    const reviewsTable = getDbTableConstants(DbTableEnum.reviews);
    const escapedId = getDbConnection().escape(id);

    const sql = `
        SELECT * FROM ${reviewsTable}
        WHERE id = ${escapedId}
    `;

    getDbConnection().query(sql, (error: IError, review: ReviewDbo) => {
        if (error) {
            throw error;
        }
        else {
            doneCb(review);
        }
    });
};
