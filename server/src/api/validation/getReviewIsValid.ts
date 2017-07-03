import { IReviewBody } from '../mapping/reviewBodyToReviewMapping';

export const reviewIsInvalidMessage = 'Invalid review';

export const getReviewIsValid = (review: IReviewBody) => { 
    const headerIsAString = typeof review.header === 'string';
    const bodyIsAString = typeof review.body === 'string';
    const ratingIsANumber = typeof review.rating === 'number';
    const gameIdIsANumber = typeof review.gameId === 'number';
    const userIdIsANumber = typeof review.userId === 'number';

    const headerIsNotEmpty = review.header;
    const bodyIsNotEmpty = review.body;
    const ratingIsNotEmpty = review.rating;
    const gameIdIsNotEmpty = review.gameId;
    const userIdIsNotEmpty = review.userId;

    const ratingIsBetween1And10 = review.rating >= 1 && review.rating <= 10;

    const hasValidTypes = headerIsAString &&
        bodyIsAString &&
        ratingIsANumber &&
        gameIdIsANumber &&
        userIdIsANumber;

    const hasNoEmptyValues = headerIsNotEmpty &&
        bodyIsNotEmpty &&
        ratingIsNotEmpty &&
        gameIdIsNotEmpty &&
        userIdIsNotEmpty;

    return hasValidTypes && hasNoEmptyValues && ratingIsBetween1And10;
};
