
export interface IDynamicStrategyDto {
    isDynamic: true;
    excludedSymbols: string[];
    topAssetCount: number;
    minPercent: string;
    maxPercent: string;
    isEqualWeight: boolean;
}
