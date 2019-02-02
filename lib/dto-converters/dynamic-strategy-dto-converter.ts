import { IDtoConverter } from "../interfaces";
import { IDynamicStrategyDto } from "../dtos";
import { IDynamicStrategy } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class DynamicStrategyDtoConverter implements IDtoConverter<IDynamicStrategyDto, IDynamicStrategy> {

    private _decimalDtoConveter = new DecimalDtoConverter();

    public convertFromDto(dto: IDynamicStrategyDto): IDynamicStrategy {
        const result: IDynamicStrategy = {
            excludedSymbols: dto.excludedSymbols.slice(0),
            isDynamic: dto.isDynamic,
            isEqualWeight: dto.isEqualWeight,
            maxPercent: this._decimalDtoConveter.convertFromDto(dto.maxPercent),
            minPercent: this._decimalDtoConveter.convertFromDto(dto.minPercent),
            topAssetCount: dto.topAssetCount,
        };
        return result;
    }

    public convertToDto(model: IDynamicStrategy): IDynamicStrategyDto {
        const result: IDynamicStrategyDto = {
            excludedSymbols: model.excludedSymbols.slice(0),
            isDynamic: model.isDynamic,
            isEqualWeight: model.isEqualWeight,
            maxPercent: this._decimalDtoConveter.convertToDto(model.maxPercent),
            minPercent: this._decimalDtoConveter.convertToDto(model.minPercent),
            topAssetCount: model.topAssetCount,
        };
        return result;
    }
}