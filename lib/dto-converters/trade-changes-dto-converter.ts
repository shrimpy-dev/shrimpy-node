import { IDtoConverter } from "../interfaces";
import { ITradeChangesDto } from "../dtos";
import { ITradeChanges } from "../models";
import { TradeChangeDtoConverter } from "./trade-change-dto-converter";
import { TradeDtoConverter } from "./trade-dto-converter";

export class TradeChangesDtoConverter implements IDtoConverter<ITradeChangesDto, ITradeChanges> {
    private _tradeChangeDtoConverter = new TradeChangeDtoConverter();
    private _tradeDtoConverter = new TradeDtoConverter();

    public convertFromDto(dto: ITradeChangesDto): ITradeChanges {
        const changes = dto.changes.map((tradeChangeDto) => {
            return this._tradeChangeDtoConverter.convertFromDto(tradeChangeDto);
        });
        const result: ITradeChanges = {
            changes: changes,
            trade: this._tradeDtoConverter.convertFromDto(dto.trade),
        };
        return result;
    }

    public convertToDto(model: ITradeChanges): ITradeChangesDto {
        const changes = model.changes.map((tradeChange) => {
            return this._tradeChangeDtoConverter.convertToDto(tradeChange);
        });
        const result: ITradeChangesDto = {
            changes: changes,
            trade: this._tradeDtoConverter.convertToDto(model.trade),
        };
        return result;
    }
}