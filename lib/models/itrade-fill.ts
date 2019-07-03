import Decimal from "decimal.js";

export interface ITradeFill {
    baseAmount: Decimal;
    baseSymbol: string;
    btcValue: number;
    price: Decimal;
    quoteAmount: Decimal;
    quoteSymbol: string;
    side: 'BUY' | 'SELL',
    usdValue: number;
}
