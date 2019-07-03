import { IDtoConverter } from "../interfaces";
import { IExchangeOrderBookDto, IMarketOrderBooksDto } from "../dtos";
import { IExchangeOrderBook, IMarketOrderBooks } from "../models";
import { ExchangeOrderBookDtoConverter } from "./exchange-order-book-dto-converter";

export class MarketOrderBooksDtoConverter implements IDtoConverter<IMarketOrderBooksDto, IMarketOrderBooks> {
    private _exchangeOrderBookDtoConverter: ExchangeOrderBookDtoConverter = new ExchangeOrderBookDtoConverter();

    public convertFromDto(dto: IMarketOrderBooksDto): IMarketOrderBooks {
        const orderBooks: IExchangeOrderBook[] = dto.orderBooks.map((exchangeOrderBookDto) => {
            return this._exchangeOrderBookDtoConverter.convertFromDto(exchangeOrderBookDto);
        });
        const result: IMarketOrderBooks = {
            baseSymbol: dto.baseSymbol,
            orderBooks: orderBooks,
            quoteSymbol: dto.quoteSymbol
        };
        return result;
    }

    public convertToDto(model: IMarketOrderBooks): IMarketOrderBooksDto {
        const orderBookDtos: IExchangeOrderBookDto[] = model.orderBooks.map((exchangeOrderBook) => {
            return this._exchangeOrderBookDtoConverter.convertToDto(exchangeOrderBook);
        });
        const result: IMarketOrderBooksDto = {
            baseSymbol: model.baseSymbol,
            orderBooks: orderBookDtos,
            quoteSymbol: model.quoteSymbol
        };
        return result;
    }
}
