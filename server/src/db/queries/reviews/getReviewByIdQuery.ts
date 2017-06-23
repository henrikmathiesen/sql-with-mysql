import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { ReviewDbo } from '../../dbo/ReviewDbo';

export const getReviewById = (id: number): Promise<ReviewDbo> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.reviews);
        const columns = getDbColumnsConstants(DbTableEnum.reviews);

        const sql = `
            SELECT * FROM ${table}
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, id, (error: IError, reviews: ReviewDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(reviews[0]);
            }
        });
    });
};
