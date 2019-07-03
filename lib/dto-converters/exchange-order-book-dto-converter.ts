import { IDtoConverter } from "../interfaces";
import { IExchangeOrderBookDto, IOrderBookDto } from "../dtos";
import { IExchangeOrderBook, IOrderBook } from "../models";
import { OrderBookDtoConverter } from "./order-book-dto-converter";

export class ExchangeOrderBookDtoConverter implements IDtoConverter<IExchangeOrderBookDto, IExchangeOrderBook> {
    private _orderBookDtoConverter: OrderBookDtoConverter = new OrderBookDtoConverter();

    public convertFromDto(dto: IExchangeOrderBookDto): IExchangeOrderBook {
        let orderBookDto: IOrderBook | null = null;
        if (dto.orderBook) {
            orderBookDto = this._orderBookDtoConverter.convertFromDto(dto.orderBook);
        }
        const result: IExchangeOrderBook = {
            exchange: dto.exchange,
            orderBook: orderBookDto
        };
        return result;
    }

    public convertToDto(model: IExchangeOrderBook): IExchangeOrderBookDto {
        let orderBookDto: IOrderBookDto | null = null;
        if (model.orderBook) {
            orderBookDto = this._orderBookDtoConverter.convertToDto(model.orderBook);
        }
        const result: IExchangeOrderBookDto = {
            exchange: model.exchange,
            orderBook: orderBookDto
        };
        return result;
    }
}
