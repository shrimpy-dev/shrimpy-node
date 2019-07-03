import { IBalanceChange } from "./ibalance-change";
import { ILimitOrder } from "./ilimit-order";

export interface ILimitOrderStatus {
    order: ILimitOrder;
    changes: IBalanceChange[];
}
