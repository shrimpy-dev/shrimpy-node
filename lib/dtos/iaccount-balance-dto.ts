import { IAssetBalanceDto } from "./iasset-balance-dto";

export interface IAccountBalanceDto {
    balances: IAssetBalanceDto[];
    retrievedAt: string | null;
}
