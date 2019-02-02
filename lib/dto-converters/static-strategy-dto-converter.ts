import { IDtoConverter } from "../interfaces";
import { IStaticStrategyDto } from "../dtos";
import { IStaticStrategy } from "../models";
import { AllocationDtoConverter } from "./allocation-dto-converter";

export class StaticStrategyDtoConverter implements IDtoConverter<IStaticStrategyDto, IStaticStrategy> {

    private _allocationDtoConverter = new AllocationDtoConverter();

    public convertFromDto(dto: IStaticStrategyDto): IStaticStrategy {
        const allocations = dto.allocations.map((allocationDto) => {
            return this._allocationDtoConverter.convertFromDto(allocationDto);
        });
        const result: IStaticStrategy = {
            allocations: allocations,
            isDynamic: false,
        };
        return result;
    }

    public convertToDto(model: IStaticStrategy): IStaticStrategyDto {
        const allocationDtos = model.allocations.map((allocation) => {
            return this._allocationDtoConverter.convertToDto(allocation);
        });
        const result: IStaticStrategyDto = {
            allocations: allocationDtos,
            isDynamic: false
        };
        return result;
    }
}