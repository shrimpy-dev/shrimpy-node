import { IDtoConverter } from "../interfaces";
import { IStrategyDto } from "../dtos";
import { IStrategy } from "../models";
import { DynamicStrategyDtoConverter } from "./dynamic-strategy-dto-converter";
import { StaticStrategyDtoConverter } from "./static-strategy-dto-converter";

export class StrategyDtoConverter implements IDtoConverter<IStrategyDto, IStrategy> {
    private _dynamicStrategyDtoConverter = new DynamicStrategyDtoConverter();
    private _staticStrategyDtoConverter = new StaticStrategyDtoConverter();

    public convertFromDto(dto: IStrategyDto): IStrategy {
        if (dto.isDynamic) {
            return this._dynamicStrategyDtoConverter.convertFromDto(dto);
        } else {
            return this._staticStrategyDtoConverter.convertFromDto(dto);
        }
    }

    public convertToDto(model: IStrategy): IStrategyDto {
        if (model.isDynamic) {
            return this._dynamicStrategyDtoConverter.convertToDto(model);
        } else {
            return this._staticStrategyDtoConverter.convertToDto(model);
        }
    }
}