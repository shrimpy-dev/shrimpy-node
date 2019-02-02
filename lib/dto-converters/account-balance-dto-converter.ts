import { IDtoConverter } from "../interfaces";
import { IAccountBalanceDto } from "../dtos";
import { IAccountBalance } from "../models";
import { AssetBalanceDtoConverter } from "./asset-balance-dto-converter";
import { NullableDateDtoConverter } from "./nullable-date-dto-converter";

export class AccountBalanceDtoConverter implements IDtoConverter<IAccountBalanceDto, IAccountBalance> {
    private _assetBalanceDtoConverter = new AssetBalanceDtoConverter();
    private _nullableDateDtoConverter = new NullableDateDtoConverter();

    public convertFromDto(dto: IAccountBalanceDto): IAccountBalance {
        const balances = dto.balances.map((assetBalancDto) => {
            return this._assetBalanceDtoConverter.convertFromDto(assetBalancDto);
        });
        const result: IAccountBalance = {
            balances: balances,
            retrievedAt: this._nullableDateDtoConverter.convertFromDto(dto.retrievedAt),
        };
        return result;
    }

    public convertToDto(model: IAccountBalance): IAccountBalanceDto {
        const balanceDtos = model.balances.map((assetBalance) => {
            return this._assetBalanceDtoConverter.convertToDto(assetBalance);
        });
        const result: IAccountBalanceDto = {
            balances: balanceDtos,
            retrievedAt: this._nullableDateDtoConverter.convertToDto(model.retrievedAt),
        };
        return result;
    }
}
