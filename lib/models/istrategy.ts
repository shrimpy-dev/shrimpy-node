import { IDynamicStrategy } from "./idynamic-strategy";
import { IStaticStrategy } from "./istatic-strategy";

export type IStrategy = IDynamicStrategy | IStaticStrategy;
