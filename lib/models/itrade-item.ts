import Decimal from "decimal.js";

export interface ITradeItem {
    id: number;
    price: Decimal;
    quantity: Decimal;
    time: Date;
    btcValue: Decimal;
    usdValue: Decimal;
}