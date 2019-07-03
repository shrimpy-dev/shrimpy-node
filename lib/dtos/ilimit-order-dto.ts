import { IExchangeApiErrorDto } from "./iexchange-api-error-dto";

export interface ILimitOrderDto {
    id: string;
    baseSymbol: string;
    quoteSymbol: string;
    amount: string;
    price: string;
    side: 'BUY' | 'SELL',
    timeInForce: 'GTC' | 'IOC',
    status: 'queued' | 'started' | 'open' | 'closed' | 'completed',
    cancelRequested: boolean,
    success: boolean,
    errorCode: number,
    errorMessage: string,
    exchangeApiErrors: IExchangeApiErrorDto[]
}
