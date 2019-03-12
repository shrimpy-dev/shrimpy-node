import { IDtoConverter } from "../interfaces";
import { IOrderBookDto } from "../dtos";
import { IOrderBook } from "../models";
import { OrderBookItemDtoConverter } from "./order-book-item-dto-converter";

export class OrderBookDtoConverter implements IDtoConverter<IOrderBookDto, IOrderBook> {
    private _orderBookItemDtoConverter: OrderBookItemDtoConverter = new OrderBookItemDtoConverter();

    public convertFromDto(dto: IOrderBookDto): IOrderBook {
        const asks = dto.asks.map((ask) => {
            return this._orderBookItemDtoConverter.convertFromDto(ask);
        });
        const bids = dto.bids.map((bid) => {
            return this._orderBookItemDtoConverter.convertFromDto(bid);
        });
        const result: IOrderBook = {
            asks: asks,
            bids: bids,
        };
        return result;
    }

    public convertToDto(model: IOrderBook): IOrderBookDto {
        const asks = model.asks.map((ask) => {
            return this._orderBookItemDtoConverter.convertToDto(ask);
        });
        const bids = model.bids.map((bid) => {
            return this._orderBookItemDtoConverter.convertToDto(bid);
        });
        const result: IOrderBookDto = {
            asks: asks,
            bids: bids,
        };
        return result;
    }
}
