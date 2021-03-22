import { IPredictionItemDto } from "./iprediction-item-dto";

export interface IPredictionsDto {
    baseTradingSymbol: string;
    quoteTradingSymbol: string;
    predictions: IPredictionItemDto[]
}