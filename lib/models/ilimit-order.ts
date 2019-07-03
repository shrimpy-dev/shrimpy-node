import { Decimal } from 'decimal.js';
import { IExchangeApiError } from './iexchange-api-error';

export interface ILimitOrder {
    id: string;
    baseSymbol: string;
    quoteSymbol: string;
    amount: Decimal;
    price: Decimal;
    side: 'BUY' | 'SELL',
    timeInForce: 'GTC' | 'IOC',
    status: 'queued' | 'started' | 'open' | 'closed' | 'completed',
    cancelRequested: boolean,
    success: boolean,
    errorCode: number,
    errorMessage: string,
    exchangeApiErrors: IExchangeApiError[]
}
