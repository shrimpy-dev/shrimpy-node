import Decimal from "decimal.js";
import { IExchangeApiError } from "./iexchange-api-error";

export interface ITrade {
    id: string;
    fromSymbol: string;
    toSymbol: string;
    amount: Decimal;
    status: string;
    success: boolean;
    errorCode: number;
    errorMessage: string;
    exchangeApiErrors: IExchangeApiError[];
    maxSpreadPercent: Decimal;
    maxSlippagePercent: Decimal;
    smartRouting: boolean;
    triggeredMaxSpread: boolean;
    triggeredMaxSlippage: boolean;
}
