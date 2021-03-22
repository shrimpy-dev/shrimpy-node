import { IPredictionItem } from "./iprediction-item";

export interface IPredictions {
    baseTradingSymbol: string;
    quoteTradingSymbol: string;
    predictions: IPredictionItem[];
}