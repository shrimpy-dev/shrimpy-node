
export interface IHistoricalInstrument {
    exchange: string;
    baseTradingSymbol: string;
    quoteTradingSymbol: string;
    orderBookStartTime: Date | null;
    orderBookEndTime: Date | null;
    tradeStartTime: Date | null;
    tradeEndTime: Date | null;
}