import { IDtoConverter } from "../interfaces";
import { IOrderBookItemDto } from "../dtos";
import { IOrderBookItem } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class OrderBookItemDtoConverter implements IDtoConverter<IOrderBookItemDto, IOrderBookItem> {
    private _decimalDtoConverter: DecimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: IOrderBookItemDto): IOrderBookItem {
        const result: IOrderBookItem = {
            price: this._decimalDtoConverter.convertFromDto(dto.price),
            quantity: this._decimalDtoConverter.convertFromDto(dto.quantity),
        };
        return result;
    }

    public convertToDto(model: IOrderBookItem): IOrderBookItemDto {
        const result: IOrderBookItemDto = {
            price: this._decimalDtoConverter.convertToDto(model.price),
            quantity: this._decimalDtoConverter.convertToDto(model.quantity),
        };
        return result;
    }
}
