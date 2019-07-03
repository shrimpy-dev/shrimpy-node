import { IExchangeOrderBookDto } from "./iexchange-order-book-dto";

export interface IMarketOrderBooksDto {
    baseSymbol: string;
    quoteSymbol: string;
    orderBooks: IExchangeOrderBookDto[];
}
