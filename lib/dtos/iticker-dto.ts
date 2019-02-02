
export interface ITickerDto {
    name: string;
    symbol: string;
    priceUsd: string | null;
    priceBtc: string | null;
    percentChange24hUsd: string | null;
    lastUpdated: string | null;
}