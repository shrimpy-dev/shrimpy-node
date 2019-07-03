import { IDtoConverter } from "../interfaces";
import { ITradeChangesDto } from "../dtos";
import { ITradeChanges } from "../models";
import { BalanceChangeDtoConverter } from "./balance-change-dto-converter";
import { TradeDtoConverter } from "./trade-dto-converter";
import { TradeFillDtoConverter } from "./trade-fill-dto-converter";

export class TradeChangesDtoConverter implements IDtoConverter<ITradeChangesDto, ITradeChanges> {
    private _balanceChangeDtoConverter = new BalanceChangeDtoConverter();
    private _tradeDtoConverter = new TradeDtoConverter();
    private _tradeFillDtoConverter = new TradeFillDtoConverter();

    public convertFromDto(dto: ITradeChangesDto): ITradeChanges {
        const changes = dto.changes.map((tradeChangeDto) => {
            return this._balanceChangeDtoConverter.convertFromDto(tradeChangeDto);
        });
        const fills = dto.fills.map((tradeFillDto) => {
            return this._tradeFillDtoConverter.convertFromDto(tradeFillDto);
        });
        const result: ITradeChanges = {
            changes: changes,
            trade: this._tradeDtoConverter.convertFromDto(dto.trade),
            fills: fills,
        };
        return result;
    }

    public convertToDto(model: ITradeChanges): ITradeChangesDto {
        const changes = model.changes.map((tradeChange) => {
            return this._balanceChangeDtoConverter.convertToDto(tradeChange);
        });
        const fills = model.fills.map((tradeFill) => {
            return this._tradeFillDtoConverter.convertToDto(tradeFill);
        });
        const result: ITradeChangesDto = {
            changes: changes,
            trade: this._tradeDtoConverter.convertToDto(model.trade),
            fills: fills,
        };
        return result;
    }
}