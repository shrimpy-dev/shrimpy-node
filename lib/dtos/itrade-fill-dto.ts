
export interface ITradeFillDto {
    baseAmount: string;
    baseSymbol: string;
    btcValue: number;
    price: string;
    quoteAmount: string;
    quoteSymbol: string;
    side: 'BUY' | 'SELL',
    usdValue: number;
}
