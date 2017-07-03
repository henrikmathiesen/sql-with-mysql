import { ReviewDbo } from '../../db/dbo/ReviewDbo';

export interface IReviewBody {
    header: string;
    body: string;
    rating: number;
    gameId: number;
    userId: number;
}

const reviewBodyToReviewMapping = (reviewBody: IReviewBody, isCreated: boolean) => {
    const review = new ReviewDbo();
    review.header = reviewBody.header;
    review.body = reviewBody.body;
    review.rating = reviewBody.rating;

    if(isCreated) {
        review.gameId = reviewBody.gameId;
        review.userId = reviewBody.userId;
        review.deleted = false;
    }

    return review;
};

export const createdReviewBodyToReviewMapping = (reviewBody: IReviewBody) => { 
    return reviewBodyToReviewMapping(reviewBody, true);
};

export const updatedReviewBodyToReviewMapping = (reviewBody: IReviewBody) => { 
    return reviewBodyToReviewMapping(reviewBody, false);
};
