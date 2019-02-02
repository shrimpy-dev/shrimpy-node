import Decimal from "decimal.js";

export interface ITradeChange {
    nativeValue: Decimal;
    symbol: string;
    usdValue: number;
    btcValue: number;
}