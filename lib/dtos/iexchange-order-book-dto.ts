import { IOrderBookDto } from './iorder-book-dto';

export interface IExchangeOrderBookDto {
    exchange: string;
    orderBook: IOrderBookDto | null;
}
