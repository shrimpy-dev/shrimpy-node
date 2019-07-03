import { IDtoConverter } from "../interfaces";
import { IBalanceChangeDto } from "../dtos";
import { IBalanceChange } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class BalanceChangeDtoConverter implements IDtoConverter<IBalanceChangeDto, IBalanceChange> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: IBalanceChangeDto): IBalanceChange {
        const result: IBalanceChange = {
            btcValue: dto.btcValue,
            nativeValue: this._decimalDtoConverter.convertFromDto(dto.nativeValue),
            symbol: dto.symbol,
            usdValue: dto.usdValue,
        };
        return result;
    }

    public convertToDto(model: IBalanceChange): IBalanceChangeDto {
        const result: IBalanceChangeDto = {
            btcValue: model.btcValue,
            nativeValue: this._decimalDtoConverter.convertToDto(model.nativeValue),
            symbol: model.symbol,
            usdValue: model.usdValue,
        };
        return result;
    }
}