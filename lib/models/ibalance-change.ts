import Decimal from "decimal.js";

export interface IBalanceChange {
    nativeValue: Decimal;
    symbol: string;
    usdValue: number;
    btcValue: number;
}