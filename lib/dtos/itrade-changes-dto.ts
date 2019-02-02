import { ITradeDto } from "./itrade-dto";
import { ITradeChangeDto } from "./itrade-change-dto";

export interface ITradeChangesDto {
    trade: ITradeDto;
    changes: ITradeChangeDto[];
}
