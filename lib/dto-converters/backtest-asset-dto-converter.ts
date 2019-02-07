import { IDtoConverter } from "../interfaces";
import { IBacktestAssetDto } from "../dtos";
import { IBacktestAsset } from "../models";
import { DateDtoConverter } from "./date-dto-converter";

export class BacktestAssetDtoConverter implements IDtoConverter<IBacktestAssetDto, IBacktestAsset> {
    private _dateDtoConverter: DateDtoConverter = new DateDtoConverter();

    public convertFromDto(dto: IBacktestAssetDto): IBacktestAsset {
        const result: IBacktestAsset = {
            symbol: dto.symbol,
            endTime: this._dateDtoConverter.convertFromDto(dto.endTime),
            startTime: this._dateDtoConverter.convertFromDto(dto.startTime),
        };
        return result;
    }

    public convertToDto(model: IBacktestAsset): IBacktestAssetDto {
        const result: IBacktestAssetDto = {
            symbol: model.symbol,
            endTime: this._dateDtoConverter.convertToDto(model.endTime),
            startTime: this._dateDtoConverter.convertToDto(model.startTime),
        };
        return result;
    }
}
