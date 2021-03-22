import { IDtoConverter } from "../interfaces";
import { IPredictionItemDto } from "../dtos";
import { IPredictionItem } from "../models";

export class PredictionItemDtoConverter implements IDtoConverter<IPredictionItemDto, IPredictionItem> {

    public convertFromDto(dto: IPredictionItemDto): IPredictionItem {
        const result: IPredictionItem = {
            date: dto.date,
            updatedAt: dto.updatedAt,
            prediction: dto.prediction
        };
        return result;
    }

    public convertToDto(model: IPredictionItem): IPredictionItemDto {
        const result: IPredictionItemDto = {
            date: model.date,
            updatedAt: model.updatedAt,
            prediction: model.prediction
        };
        return result;
    }
}
