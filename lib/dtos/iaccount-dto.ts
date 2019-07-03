import { IExchangeApiErrorDto } from './iexchange-api-error-dto';

export interface IAccountDto {
    exchange: string;
    id: number;
    isRebalancing: string;
    exchangeApiErrors: IExchangeApiErrorDto[];
}
