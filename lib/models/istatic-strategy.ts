import { IAllocation } from "./iallocation";

export interface IStaticStrategy {
    isDynamic: false;
    allocations: IAllocation[];
}
