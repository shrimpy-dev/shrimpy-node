import { IDtoConverter } from "../interfaces";
import { IHistoricalOrderBookDto, IHistoricalOrderBookItemDto } from "../dtos";
import { IHistoricalOrderBook, IHistoricalOrderBookItem } from "../models"; 
import { DecimalDtoConverter } from "./decimal-dto-converter";
import { DateDtoConverter } from "./date-dto-converter";


export class HistoricalOrderBookItemDtoConverter implements IDtoConverter<IHistoricalOrderBookItemDto, IHistoricalOrderBookItem> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: IHistoricalOrderBookItemDto): IHistoricalOrderBookItem {
        return {
            price: this._decimalDtoConverter.convertFromDto(dto.price),
            size: this._decimalDtoConverter.convertFromDto(dto.size)
        };
    }

    public convertToDto(model: IHistoricalOrderBookItem): IHistoricalOrderBookItemDto {
        return {
            price: this._decimalDtoConverter.convertToDto(model.price),
            size: this._decimalDtoConverter.convertToDto(model.size)
        };
    }
}


export class HistoricalOrderBooksDtoConverter implements IDtoConverter<IHistoricalOrderBookDto[], IHistoricalOrderBook[]> {
    
    private _dateDtoConverter = new DateDtoConverter();
    private _historicalOrderBookItemDtoConverter = new HistoricalOrderBookItemDtoConverter();

    public convertFromDto(dto: IHistoricalOrderBookDto[]): IHistoricalOrderBook[] {

        return dto.map((historicalDepthDto) => {
            const historicalDepth: IHistoricalOrderBook = {
                time: this._dateDtoConverter.convertFromDto(historicalDepthDto.time),
                bids: historicalDepthDto.bids.map((depthItemDto) => {
                    return this._historicalOrderBookItemDtoConverter.convertFromDto(depthItemDto);
                }),
                asks: historicalDepthDto.asks.map((depthItemDto) => {
                    return this._historicalOrderBookItemDtoConverter.convertFromDto(depthItemDto);
                })
            };

            return historicalDepth;
        });
    }

    public convertToDto(model: IHistoricalOrderBook[]): IHistoricalOrderBookDto[] {
        return model.map((historicalDepth) => {
            const historicalDepthDto: IHistoricalOrderBookDto = {
                time: this._dateDtoConverter.convertToDto(historicalDepth.time),
                bids: historicalDepth.bids.map((depthItem) => {
                    return this._historicalOrderBookItemDtoConverter.convertToDto(depthItem);
                }),
                asks: historicalDepth.asks.map((depthItem) => {
                    return this._historicalOrderBookItemDtoConverter.convertToDto(depthItem);
                })
            };

            return historicalDepthDto;
        });
    }
}