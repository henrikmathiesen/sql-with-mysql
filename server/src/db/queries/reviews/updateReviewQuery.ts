import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const updateReviewQuery = (review: ReviewDbo, doneCb) => { 
    const table = getDbTableConstants(DbTableEnum.reviews);
    const columns = getDbColumnsConstants(DbTableEnum.reviews);

    const sql = `
        UPDATE ${table}
        SET ?
        WHERE ${columns.id} = ?
    `;

    getDbConnection().query(sql, [review, review.id], (error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
