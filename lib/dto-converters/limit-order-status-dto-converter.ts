import { IDtoConverter } from "../interfaces";
import { ILimitOrderStatusDto } from "../dtos";
import { ILimitOrderStatus } from "../models";
import { BalanceChangeDtoConverter } from "./balance-change-dto-converter";
import { LimitOrderDtoConverter } from './limit-order-dto-converter';

export class LimitOrderStatusDtoConverter implements IDtoConverter<ILimitOrderStatusDto, ILimitOrderStatus> {

    private _limitOrderDtoConverter = new LimitOrderDtoConverter();
    private _balanceChangeDtoConverter = new BalanceChangeDtoConverter();

    public convertFromDto(dto: ILimitOrderStatusDto): ILimitOrderStatus {
        const result: ILimitOrderStatus = {
            order: this._limitOrderDtoConverter.convertFromDto(dto.order),
            changes: dto.changes.map((change) => {
                return this._balanceChangeDtoConverter.convertFromDto(change);
            }),
        };
        return result;
    }

    public convertToDto(model: ILimitOrderStatus): ILimitOrderStatusDto {
        const result: ILimitOrderStatusDto = {
            order: this._limitOrderDtoConverter.convertToDto(model.order),
            changes: model.changes.map((change) => {
                return this._balanceChangeDtoConverter.convertToDto(change);
            }),
        };
        return result;
    }
}
