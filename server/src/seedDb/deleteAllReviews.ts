import { ReviewDbo } from '../db/dbo/ReviewDbo';
import { getReviewsQuery } from '../db/queries/reviews/getReviewsQuery';
import { deleteReviewByIdQuery } from '../db/queries/reviews/deleteReviewByIdQuery';

export const deleteAllReviews = () => {
    return new Promise((resolve, reject) => {
        getReviewsQuery()
            .then((reviews: ReviewDbo[]) => {
                if (!reviews) {
                    resolve();
                }
                else {
                    return Promise.all(reviews.map((review) => {
                        return deleteReviewByIdQuery(review.id)
                    }))
                        .then(resolve);

                }
            })
            .catch(reject);
    });
};
