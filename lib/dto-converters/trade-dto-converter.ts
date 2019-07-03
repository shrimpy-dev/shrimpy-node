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
            maxSpreadPercent: this._decimalDtoConverter.convertFromDto(dto.maxSpreadPercent),
            maxSlippagePercent: this._decimalDtoConverter.convertFromDto(dto.maxSlippagePercent),
            smartRouting: dto.smartRouting,
            triggeredMaxSpread: dto.triggeredMaxSpread,
            triggeredMaxSlippage: dto.triggeredMaxSlippage,
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
            maxSpreadPercent: this._decimalDtoConverter.convertToDto(model.maxSpreadPercent),
            maxSlippagePercent: this._decimalDtoConverter.convertToDto(model.maxSlippagePercent),
            smartRouting: model.smartRouting,
            triggeredMaxSpread: model.triggeredMaxSpread,
            triggeredMaxSlippage: model.triggeredMaxSlippage,
        };
        return result;
    }
}