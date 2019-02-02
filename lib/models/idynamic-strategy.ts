import Decimal from "decimal.js";

export interface IDynamicStrategy {
    isDynamic: true;
    excludedSymbols: string[];
    topAssetCount: number;
    minPercent: Decimal;
    maxPercent: Decimal;
    isEqualWeight: boolean;
}
