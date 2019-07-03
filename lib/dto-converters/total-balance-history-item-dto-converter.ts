import { IDtoConverter } from "../interfaces";
import { ITotalBalanceHistoryItemDto } from "../dtos";
import { ITotalBalanceHistoryItem } from "../models";
import { DateDtoConverter } from "./date-dto-converter";

export class TotalBalanceHistoryItemDtoConverter implements IDtoConverter<ITotalBalanceHistoryItemDto, ITotalBalanceHistoryItem> {
    private _dateDtoConverter = new DateDtoConverter();

    public convertFromDto(dto: ITotalBalanceHistoryItemDto): ITotalBalanceHistoryItem {
        const result: ITotalBalanceHistoryItem = {
            btcValue: dto.btcValue,
            date: this._dateDtoConverter.convertFromDto(dto.date),
            usdValue: dto.usdValue,
        };
        return result;
    }

    public convertToDto(model: ITotalBalanceHistoryItem): ITotalBalanceHistoryItemDto {
        const result: ITotalBalanceHistoryItemDto = {
            btcValue: model.btcValue,
            date: this._dateDtoConverter.convertToDto(model.date),
            usdValue: model.usdValue,
        };
        return result;
    }
}