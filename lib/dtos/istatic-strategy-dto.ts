import { IAllocationDto } from "./iallocation-dto";

export interface IStaticStrategyDto {
    isDynamic: false;
    allocations: IAllocationDto[];
}
