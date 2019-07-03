import Decimal from "decimal.js";

export interface IAssetInsight {
    id: number;
    change7d: Decimal | null;
    change24h: Decimal | null;
    change30d: Decimal | null;
    percent: Decimal;
}
