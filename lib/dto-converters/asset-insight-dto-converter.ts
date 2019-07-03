import { IDtoConverter } from "../interfaces";
import { IAssetInsightDto } from "../dtos";
import { IAssetInsight } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";
import { NullableDecimalDtoConverter } from "./nullable-decimal-dto-converter";

export class AssetInsightDtoConverter implements IDtoConverter<IAssetInsightDto, IAssetInsight> {
    private _nullableDecimalDtoConverter = new NullableDecimalDtoConverter();
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: IAssetInsightDto): IAssetInsight {
        const result: IAssetInsight = {
            id: dto.id,
            percent: this._decimalDtoConverter.convertFromDto(dto.percent),
            change24h: this._nullableDecimalDtoConverter.convertFromDto(dto.change24h),
            change7d: this._nullableDecimalDtoConverter.convertFromDto(dto.change7d),
            change30d: this._nullableDecimalDtoConverter.convertFromDto(dto.change30d),
        };
        return result;
    }

    public convertToDto(model: IAssetInsight): IAssetInsightDto {
        const result: IAssetInsightDto = {
            id: model.id,
            percent: this._decimalDtoConverter.convertToDto(model.percent),
            change24h: this._nullableDecimalDtoConverter.convertToDto(model.change24h),
            change7d: this._nullableDecimalDtoConverter.convertToDto(model.change7d),
            change30d: this._nullableDecimalDtoConverter.convertToDto(model.change30d),
        };
        return result;
    }
}