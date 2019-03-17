import { IExchangeApiError } from './iexchange-api-error';

export interface IAccount {
    exchange: string;
    id: number;
    isRebalancing: string;
    exchangeApiErrors: IExchangeApiError[];
}
