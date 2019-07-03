import { IBalanceChange } from "./ibalance-change";
import { ITrade } from "./itrade";
import { ITradeFill } from "./itrade-fill";

export interface ITradeChanges {
    trade: ITrade;
    changes: IBalanceChange[];
    fills: ITradeFill[];
}
