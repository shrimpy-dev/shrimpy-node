import { IDtoConverter } from "../interfaces";
import { IHistoricalTradeDto } from "../dtos";
import { IHistoricalTrade } from "../models";
import { DateDtoConverter } from "./date-dto-converter";
import { DecimalDtoConverter } from "./decimal-dto-converter";


export class TakerSideDtoConverter implements IDtoConverter<string, "buyer" | "seller" | "unknown"> {

    public convertFromDto(dto: string): "buyer" | "seller" | "unknown" {

        if (dto == "buyer") {
            return "buyer";
        }
        else if(dto == "seller") {
            return "seller";
        }
        
        return "unknown";
    }

    public convertToDto(model: "buyer" | "seller" | "unknown"): string {
        return model.toString();
    }
}


export class HistoricalTradesDtoConverter implements IDtoConverter<IHistoricalTradeDto[], IHistoricalTrade[]> {

    private _dateDtoConverter = new DateDtoConverter();
    private _decimalDtoConverter = new DecimalDtoConverter();
    private _takerSideDtoConverter = new TakerSideDtoConverter();

    public convertFromDto(dto: IHistoricalTradeDto[]): IHistoricalTrade[] {
        return dto.map((historicalTradeDto) => {
            const historicalTrade: IHistoricalTrade = {
                time: this._dateDtoConverter.convertFromDto(historicalTradeDto.time),
                price: this._decimalDtoConverter.convertFromDto(historicalTradeDto.price),
                size: this._decimalDtoConverter.convertFromDto(historicalTradeDto.size),
                takerSide: this._takerSideDtoConverter.convertFromDto(historicalTradeDto.takerSide)
            }

            return historicalTrade;
        });
    }

    public convertToDto(model: IHistoricalTrade[]): IHistoricalTradeDto[] {
        return model.map((historicalTrade) => {
            const historicalTradeDto: IHistoricalTradeDto = {
                time: this._dateDtoConverter.convertToDto(historicalTrade.time),
                price: this._decimalDtoConverter.convertToDto(historicalTrade.price),
                size: this._decimalDtoConverter.convertToDto(historicalTrade.size),
                takerSide: this._takerSideDtoConverter.convertToDto(historicalTrade.takerSide)
            }

            return historicalTradeDto;
        });
    }
}