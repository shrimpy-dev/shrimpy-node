import { IDtoConverter } from "../interfaces";
import { IPredictionsDto } from "../dtos";
import { IPredictions } from "../models";
import { PredictionItemDtoConverter } from "./prediction-item-dto-converter";


export class PredictionsDtoConverter implements IDtoConverter<IPredictionsDto, IPredictions> {
    private _predictionItemDtoConverter: PredictionItemDtoConverter = new PredictionItemDtoConverter();

    public convertFromDto(dto: IPredictionsDto): IPredictions {
        const predictions = dto.predictions.map((predictionsDto) => {
            return this._predictionItemDtoConverter.convertFromDto(predictionsDto);
        });
       
        const result: IPredictions = {
            predictions: predictions,
            baseTradingSymbol: dto.baseTradingSymbol,
            quoteTradingSymbol: dto.quoteTradingSymbol,
        };
        return result

    }

    
    public convertToDto(model: IPredictions): IPredictionsDto {

        const predictions = model.predictions.map((predictions) => {
            return this._predictionItemDtoConverter.convertToDto(predictions);
        });
        
        const result: IPredictionsDto = {
            baseTradingSymbol: model.baseTradingSymbol,
            quoteTradingSymbol: model.quoteTradingSymbol,
            predictions: predictions
        };
        return result;
    }
}
