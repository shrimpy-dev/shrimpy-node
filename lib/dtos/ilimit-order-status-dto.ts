import { IBalanceChangeDto } from "./ibalance-change-dto";
import { ILimitOrderDto } from "./ilimit-order-dto";

export interface ILimitOrderStatusDto {
    order: ILimitOrderDto;
    changes: IBalanceChangeDto[];
}
