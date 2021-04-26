import { IDtoConverter } from "../interfaces";
import { ITrendDto } from "../dtos";
import { ITrend } from "../models";

export class TrendDtoConverter implements IDtoConverter<ITrendDto, ITrend> {
    public convertFromDto(dto: ITrendDto): ITrend {
      
        const result: ITrend = {
            exchange: dto.exchange,
            baseTradingSymbol: dto.baseTradingSymbol,
            quoteTradingSymbol: dto.quoteTradingSymbol,
            trend: dto.trend,
            date: dto.date
        };
        return result

    }

    public convertToDto(model: ITrend): ITrendDto {

        const result: ITrendDto = {
            exchange: model.exchange,
            baseTradingSymbol: model.baseTradingSymbol,
            quoteTradingSymbol: model.quoteTradingSymbol,
            trend: model.trend,
            date: model.date
        };
        return result;
    }
}
