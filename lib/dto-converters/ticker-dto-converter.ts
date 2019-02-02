import { IDtoConverter } from "../interfaces";
import { ITickerDto } from "../dtos";
import { ITicker } from "../models";
import { NullableDateDtoConverter } from "./nullable-date-dto-converter";
import { NullableDecimalDtoConverter } from "./nullable-decimal-dto-converter";

export class TickerDtoConverter implements IDtoConverter<ITickerDto, ITicker> {
    private _nullableDecimalDtoConverter = new NullableDecimalDtoConverter();
    private _nullableDateDtoConverter = new NullableDateDtoConverter();

    public convertFromDto(dto: ITickerDto): ITicker {
        const result: ITicker = {
            lastUpdated: this._nullableDateDtoConverter.convertFromDto(dto.lastUpdated),
            name: dto.name,
            percentChange24hUsd: this._nullableDecimalDtoConverter.convertFromDto(dto.percentChange24hUsd),
            priceBtc: this._nullableDecimalDtoConverter.convertFromDto(dto.priceBtc),
            priceUsd: this._nullableDecimalDtoConverter.convertFromDto(dto.priceUsd),
            symbol: dto.symbol
        };
        return result;
    }

    public convertToDto(model: ITicker): ITickerDto {
        const result: ITickerDto = {
            lastUpdated: this._nullableDateDtoConverter.convertToDto(model.lastUpdated),
            name: model.name,
            percentChange24hUsd: this._nullableDecimalDtoConverter.convertToDto(model.percentChange24hUsd),
            priceBtc: this._nullableDecimalDtoConverter.convertToDto(model.priceBtc),
            priceUsd: this._nullableDecimalDtoConverter.convertToDto(model.priceUsd),
            symbol: model.symbol
        };
        return result;
    }
}