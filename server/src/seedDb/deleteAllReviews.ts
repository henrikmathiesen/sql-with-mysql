import { ReviewDbo } from '../db/dbo/ReviewDbo';
import { getEntitiesIncludeSetDeletedQuery } from '../db/queries/getEntitiesIncludeSetDeletedQuery';
import { deleteEntityByIdQuery } from '../db/queries/deleteEntityByIdQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

export const deleteAllReviews = () => {
    return new Promise((resolve, reject) => {
        getEntitiesIncludeSetDeletedQuery(DbTableEnum.reviews)
            .then((reviews: ReviewDbo[]) => {
                if (!reviews) {
                    resolve();
                }
                else {
                    return Promise.all(reviews.map((review) => {
                        return deleteEntityByIdQuery(DbTableEnum.reviews, review.id)
                    }))
                        .then(resolve);

                }
            })
            .catch(reject);
    });
};
