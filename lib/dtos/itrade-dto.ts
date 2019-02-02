
export interface ITradeDto {
    id: string;
    fromSymbol: string;
    toSymbol: string;
    amount: string;
    status: string;
    success: boolean;
    errorCode: number;
    errorMessage: string;
}
