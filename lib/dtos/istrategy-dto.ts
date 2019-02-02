import { IDynamicStrategyDto } from "./idynamic-strategy-dto";
import { IStaticStrategyDto } from "./istatic-strategy-dto";

export type IStrategyDto = IDynamicStrategyDto | IStaticStrategyDto;
