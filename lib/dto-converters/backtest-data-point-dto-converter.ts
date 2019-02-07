import { IDtoConverter } from "../interfaces";
import { IBacktestDataPointDto } from "../dtos";
import { IBacktestDataPoint } from "../models";
import { DateDtoConverter } from "./date-dto-converter";

export class BacktestDataPointDtoConverter implements IDtoConverter<IBacktestDataPointDto, IBacktestDataPoint> {
    private _dateDtoConverter: DateDtoConverter = new DateDtoConverter();

    public convertFromDto(dto: IBacktestDataPointDto): IBacktestDataPoint {
        const result: IBacktestDataPoint = {
            time: this._dateDtoConverter.convertFromDto(dto.time),
            usdValue: dto.usdValue,
        };
        return result;
    }

    public convertToDto(model: IBacktestDataPoint): IBacktestDataPointDto {
        const result: IBacktestDataPointDto = {
            time: this._dateDtoConverter.convertToDto(model.time),
            usdValue: model.usdValue,
        };
        return result;
    }
}
