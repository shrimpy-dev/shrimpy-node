import { IDtoConverter } from "../interfaces";
import { ILimitOrderDto } from "../dtos";
import { ILimitOrder } from "../models";
import { DecimalDtoConverter } from './decimal-dto-converter';

export class LimitOrderDtoConverter implements IDtoConverter<ILimitOrderDto, ILimitOrder> {

    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: ILimitOrderDto): ILimitOrder {
        const result: ILimitOrder = {
            id: dto.id,
            baseSymbol: dto.baseSymbol,
            quoteSymbol: dto.quoteSymbol,
            amount: this._decimalDtoConverter.convertFromDto(dto.amount),
            price: this._decimalDtoConverter.convertFromDto(dto.price),
            side: dto.side,
            timeInForce: dto.timeInForce,
            status: dto.status,
            cancelRequested: dto.cancelRequested,
            success: dto.success,
            errorCode: dto.errorCode,
            errorMessage: dto.errorMessage,
            exchangeApiErrors: dto.exchangeApiErrors,
        };
        return result;
    }

    public convertToDto(model: ILimitOrder): ILimitOrderDto {
        const result: ILimitOrderDto = {
            id: model.id,
            baseSymbol: model.baseSymbol,
            quoteSymbol: model.quoteSymbol,
            amount: this._decimalDtoConverter.convertToDto(model.amount),
            price: this._decimalDtoConverter.convertToDto(model.price),
            side: model.side,
            timeInForce: model.timeInForce,
            status: model.status,
            cancelRequested: model.cancelRequested,
            success: model.success,
            errorCode: model.errorCode,
            errorMessage: model.errorMessage,
            exchangeApiErrors: model.exchangeApiErrors,
        };
        return result;
    }
}
