import Decimal from "decimal.js";

export interface IHistoricalTrade {
    time: Date;
    price: Decimal;
    size: Decimal;
    takerSide: 'buyer' | 'seller' | 'unknown';
}
