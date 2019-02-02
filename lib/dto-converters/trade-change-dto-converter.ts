import { IDtoConverter } from "../interfaces";
import { ITradeChangeDto } from "../dtos";
import { ITradeChange } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class TradeChangeDtoConverter implements IDtoConverter<ITradeChangeDto, ITradeChange> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: ITradeChangeDto): ITradeChange {
        const result: ITradeChange = {
            btcValue: dto.btcValue,
            nativeValue: this._decimalDtoConverter.convertFromDto(dto.nativeValue),
            symbol: dto.symbol,
            usdValue: dto.usdValue,
        };
        return result;
    }

    public convertToDto(model: ITradeChange): ITradeChangeDto {
        const result: ITradeChangeDto = {
            btcValue: model.btcValue,
            nativeValue: this._decimalDtoConverter.convertToDto(model.nativeValue),
            symbol: model.symbol,
            usdValue: model.usdValue,
        };
        return result;
    }
}