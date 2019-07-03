import { IExchangeApiErrorDto } from './iexchange-api-error-dto';

export interface ITradeDto {
    id: string;
    fromSymbol: string;
    toSymbol: string;
    amount: string;
    status: string;
    success: boolean;
    errorCode: number;
    errorMessage: string;
    exchangeApiErrors: IExchangeApiErrorDto[];
    maxSpreadPercent: string;
    maxSlippagePercent: string;
    smartRouting: boolean;
    triggeredMaxSpread: boolean;
    triggeredMaxSlippage: boolean;
}
