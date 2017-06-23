import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const getReviewsQuery = (): Promise<ReviewDbo[]> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.reviews);

        const sql = `
            SELECT * FROM ${table}
        `;

        getDbConnection().query(sql, (error: IError, reviews: ReviewDbo[]) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(reviews);
            }
        });
    });
};
