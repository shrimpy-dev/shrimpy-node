export interface IHistoricalOrderBookItemDto {
    price: string;
    size: string;
}

export interface IHistoricalOrderBookDto {
    time: string;
    bids: IHistoricalOrderBookItemDto[];
    asks: IHistoricalOrderBookItemDto[];
}
