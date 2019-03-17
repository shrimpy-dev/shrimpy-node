import { IDtoConverter } from "../interfaces";
import { ITradeDto } from "../dtos";
import { ITrade } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class TradeDtoConverter implements IDtoConverter<ITradeDto, ITrade> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: ITradeDto): ITrade {
        const result: ITrade = {
            amount: this._decimalDtoConverter.convertFromDto(dto.amount),
            errorCode: dto.errorCode,
            errorMessage: dto.errorMessage,
            fromSymbol: dto.fromSymbol,
            id: dto.id,
            status: dto.status,
            success: dto.success,
            toSymbol: dto.toSymbol,
            exchangeApiErrors: dto.exchangeApiErrors,
        };
        return result;
    }

    public convertToDto(model: ITrade): ITradeDto {
        const result: ITradeDto = {
            amount: this._decimalDtoConverter.convertToDto(model.amount),
            errorCode: model.errorCode,
            errorMessage: model.errorMessage,
            fromSymbol: model.fromSymbol,
            id: model.id,
            status: model.status,
            success: model.success,
            toSymbol: model.toSymbol,
            exchangeApiErrors: model.exchangeApiErrors,
        };
        return result;
    }
}