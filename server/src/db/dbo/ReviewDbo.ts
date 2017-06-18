export interface IReviewDbo {
    readonly id: number;
    header: string;
    body: string;
    rating: number;
    gameId: number;
    userId: number;
}
