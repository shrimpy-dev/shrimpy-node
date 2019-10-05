import { IDtoConverter } from "../interfaces";
import { IHistoricalCandlestickDto } from "../dtos";
import { IHistoricalCandlestick } from "../models";
import { DateDtoConverter } from "./date-dto-converter";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class HistoricalCandlestickDtoConverter implements IDtoConverter<IHistoricalCandlestickDto, IHistoricalCandlestick> {
    private _dateDtoConverter: DateDtoConverter = new DateDtoConverter();
    private _decimalDtoConverter: DecimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: IHistoricalCandlestickDto): IHistoricalCandlestick {
        const result: IHistoricalCandlestick = {
            open: this._decimalDtoConverter.convertFromDto(dto.open),
            high: this._decimalDtoConverter.convertFromDto(dto.high),
            low: this._decimalDtoConverter.convertFromDto(dto.low),
            close: this._decimalDtoConverter.convertFromDto(dto.close),
            volume: this._decimalDtoConverter.convertFromDto(dto.volume),
            quoteVolume: dto.quoteVolume,
            btcVolume: dto.btcVolume,
            usdVolume: dto.usdVolume,
            time: this._dateDtoConverter.convertFromDto(dto.time),
        };
        return result;
    }

    public convertToDto(model: IHistoricalCandlestick): IHistoricalCandlestickDto {
        const result: IHistoricalCandlestickDto = {
            open: this._decimalDtoConverter.convertToDto(model.open),
            high: this._decimalDtoConverter.convertToDto(model.high),
            low: this._decimalDtoConverter.convertToDto(model.low),
            close: this._decimalDtoConverter.convertToDto(model.close),
            volume: this._decimalDtoConverter.convertToDto(model.volume),
            quoteVolume: model.quoteVolume,
            btcVolume: model.btcVolume,
            usdVolume: model.usdVolume,
            time: this._dateDtoConverter.convertToDto(model.time),
        };
        return result;
    }
}