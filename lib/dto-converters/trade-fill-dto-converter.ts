import { IDtoConverter } from "../interfaces";
import { ITradeFillDto } from "../dtos";
import { ITradeFill } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class TradeFillDtoConverter implements IDtoConverter<ITradeFillDto, ITradeFill> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: ITradeFillDto): ITradeFill {
        const result: ITradeFill = {
            baseAmount: this._decimalDtoConverter.convertFromDto(dto.baseAmount),
            baseSymbol: dto.baseSymbol,
            btcValue: dto.btcValue,
            price: this._decimalDtoConverter.convertFromDto(dto.price),
            quoteAmount: this._decimalDtoConverter.convertFromDto(dto.quoteAmount),
            quoteSymbol: dto.quoteSymbol,
            side: dto.side,
            usdValue: dto.usdValue,
        };
        return result;
    }

    public convertToDto(model: ITradeFill): ITradeFillDto {
        const result: ITradeFillDto = {
            baseAmount: this._decimalDtoConverter.convertToDto(model.baseAmount),
            baseSymbol: model.baseSymbol,
            btcValue: model.btcValue,
            price: this._decimalDtoConverter.convertToDto(model.price),
            quoteAmount: this._decimalDtoConverter.convertToDto(model.quoteAmount),
            quoteSymbol: model.quoteSymbol,
            side: model.side,
            usdValue: model.usdValue,
        };
        return result;
    }
}