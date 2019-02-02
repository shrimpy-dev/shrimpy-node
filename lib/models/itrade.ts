import Decimal from "decimal.js";

export interface ITrade {
    id: string;
    fromSymbol: string;
    toSymbol: string;
    amount: Decimal;
    status: string;
    success: boolean;
    errorCode: number;
    errorMessage: string;
}
