import { IAssetBalance } from "./iasset-balance";

export interface IAccountBalance {
    balances: IAssetBalance[];
    retrievedAt: Date | null;
}
