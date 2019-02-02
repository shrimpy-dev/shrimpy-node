import Decimal from "decimal.js";

export interface ITicker {
    name: string;
    symbol: string;
    priceUsd: Decimal | null;
    priceBtc: Decimal | null;
    percentChange24hUsd: Decimal | null;
    lastUpdated: Date | null;
}
