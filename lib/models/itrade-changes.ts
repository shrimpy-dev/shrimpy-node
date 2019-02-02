import { ITrade } from "./itrade";
import { ITradeChange } from "./itrade-change";

export interface ITradeChanges {
    trade: ITrade;
    changes: ITradeChange[];
}
