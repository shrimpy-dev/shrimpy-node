import { IDtoConverter } from "../interfaces";
import { IAssetBalanceDto } from "../dtos";
import { IAssetBalance } from "../models";

export class AssetBalanceDtoConverter implements IDtoConverter<IAssetBalanceDto, IAssetBalance> {

    public convertFromDto(dto: IAssetBalanceDto): IAssetBalance {
        const result: IAssetBalance = {
            btcValue: dto.btcValue,
            nativeValue: dto.nativeValue,
            symbol: dto.symbol,
            usdValue: dto.usdValue,
        };
        return result;
    }

    public convertToDto(model: IAssetBalance): IAssetBalanceDto {
        const result: IAssetBalanceDto = {
            btcValue: model.btcValue,
            nativeValue: model.nativeValue,
            symbol: model.symbol,
            usdValue: model.usdValue,
        };
        return result;
    }
}