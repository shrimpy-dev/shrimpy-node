import Decimal from "decimal.js";

export interface IHistoricalOrderBookItem {
    price: Decimal;
    size: Decimal;
}

export interface IHistoricalOrderBook {
    time: Date;
    bids: IHistoricalOrderBookItem[];
    asks: IHistoricalOrderBookItem[];
}
