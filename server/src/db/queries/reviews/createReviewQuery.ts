import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const createReviewQuery = (review: ReviewDbo, doneCb) => { 
    const table = getDbTableConstants(DbTableEnum.reviews);

    const sql = `
        INSERT INTO ${table} 
        SET ?
    `;

    getDbConnection().query(sql, review, (error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
