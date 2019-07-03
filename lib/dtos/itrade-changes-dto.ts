import { IBalanceChangeDto } from "./ibalance-change-dto";
import { ITradeDto } from "./itrade-dto";
import { ITradeFillDto } from "./itrade-fill-dto";

export interface ITradeChangesDto {
    trade: ITradeDto;
    changes: IBalanceChangeDto[];
    fills: ITradeFillDto[];
}
