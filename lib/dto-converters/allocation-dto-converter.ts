import { IDtoConverter } from "../interfaces";
import { IAllocationDto } from "../dtos";
import { IAllocation } from "../models";
import { DecimalDtoConverter } from "./decimal-dto-converter";

export class AllocationDtoConverter implements IDtoConverter<IAllocationDto, IAllocation> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: IAllocationDto): IAllocation {
        const result: IAllocation = {
            percent: this._decimalDtoConverter.convertFromDto(dto.percent),
            symbol: dto.symbol,
        };
        return result;
    }

    public convertToDto(model: IAllocation): IAllocationDto {
        const result: IAllocationDto = {
            percent: this._decimalDtoConverter.convertToDto(model.percent),
            symbol: model.symbol,
        };
        return result;
    }
}