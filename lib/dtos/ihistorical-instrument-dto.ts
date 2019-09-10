
export interface IHistoricalInstrumentDto {
    exchange: string;
    baseTradingSymbol: string;
    quoteTradingSymbol: string;
    orderBookStartTime: string | null;
    orderBookEndTime: string | null;
    tradeStartTime: string | null;
    tradeEndTime: string | null;
}
