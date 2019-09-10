import { IDtoConverter } from "../interfaces";
import { IHistoricalInstrumentDto } from "../dtos";
import { IHistoricalInstrument } from "../models"; 
import { DateDtoConverter } from "./date-dto-converter";


export class HistoricalInstrumentsDtoConverter implements IDtoConverter<IHistoricalInstrumentDto[], IHistoricalInstrument[]> {

    private _dateDtoConverter = new DateDtoConverter();

    public convertFromDto(dto: IHistoricalInstrumentDto[]): IHistoricalInstrument[] {

        return dto.map((dtoItem) => {
            const orderBookStartTime = dtoItem.orderBookStartTime !== null ? this._dateDtoConverter.convertFromDto(dtoItem.orderBookStartTime) : null;
            const orderBookEndTime = dtoItem.orderBookEndTime !== null ? this._dateDtoConverter.convertFromDto(dtoItem.orderBookEndTime) : null;
            const tradeStartTime = dtoItem.tradeStartTime !== null ? this._dateDtoConverter.convertFromDto(dtoItem.tradeStartTime) : null;
            const tradeEndTime = dtoItem.tradeEndTime !== null ? this._dateDtoConverter.convertFromDto(dtoItem.tradeEndTime) : null;

            const result: IHistoricalInstrument = {
                exchange: dtoItem.exchange,
                baseTradingSymbol: dtoItem.baseTradingSymbol,
                quoteTradingSymbol: dtoItem.quoteTradingSymbol,
                orderBookStartTime: orderBookStartTime,
                orderBookEndTime: orderBookEndTime,
                tradeStartTime: tradeStartTime,
                tradeEndTime: tradeEndTime
            };

            return result;
        });
    }

    public convertToDto(model: IHistoricalInstrument[]): IHistoricalInstrumentDto[] {

        return model.map((model) => {
            const orderBookStartTime = model.orderBookStartTime !== null ? this._dateDtoConverter.convertToDto(model.orderBookStartTime) : null;
            const orderBookEndTime = model.orderBookEndTime !== null ? this._dateDtoConverter.convertToDto(model.orderBookEndTime) : null;
            const tradeStartTime = model.tradeStartTime !== null ? this._dateDtoConverter.convertToDto(model.tradeStartTime) : null;
            const tradeEndTime = model.tradeEndTime !== null ? this._dateDtoConverter.convertToDto(model.tradeEndTime) : null;

            const result: IHistoricalInstrumentDto = {
                exchange: model.exchange,
                baseTradingSymbol: model.baseTradingSymbol,
                quoteTradingSymbol: model.quoteTradingSymbol,
                orderBookStartTime: orderBookStartTime,
                orderBookEndTime: orderBookEndTime,
                tradeStartTime: tradeStartTime,
                tradeEndTime: tradeEndTime
            };

            return result;
        });
    }
}