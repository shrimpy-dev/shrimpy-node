import { IOrderBook } from './iorder-book';

export interface IExchangeOrderBook {
    exchange: string;
    orderBook: IOrderBook | null;
}
