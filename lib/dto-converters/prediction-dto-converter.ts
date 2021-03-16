import { IDtoConverter } from "../interfaces";
import { IPredictionDto } from "../dtos";
import { IPrediction } from "../models";

export class PredictionDtoConverter implements IDtoConverter<IPredictionDto, IPrediction> {

    public convertFromDto(dto: IPredictionDto): IPrediction {
        const result: IPrediction = {
            date: dto.date,
            prediction: dto.prediction,
            updatedAt: dto.updatedAt
        };
        return result;
    }

    public convertToDto(model: IPrediction): IPredictionDto {
        const result: IPredictionDto = {
            date: model.date,
            prediction: model.prediction,
            updatedAt: model.updatedAt
        };
        return result;
    }
}
