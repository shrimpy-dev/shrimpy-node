import { IExchangeOrderBook } from "./iexchange-order-book";

export interface IMarketOrderBooks {
    baseSymbol: string;
    quoteSymbol: string;
    orderBooks: IExchangeOrderBook[];
}
