import { IUserDto } from "../dtos";
import { IDtoConverter } from "../interfaces";
import { IUser } from "../models";
import { DateDtoConverter } from "./date-dto-converter";

export class UserDtoConverter implements IDtoConverter<IUserDto, IUser> {
    private _dateDtoConverter = new DateDtoConverter();

    public convertFromDto(dto: IUserDto): IUser {
        let expirationDate: Date | null;
        if (dto.expirationDate) {
            expirationDate = this._dateDtoConverter.convertFromDto(dto.expirationDate)
        } else {
            expirationDate = null;
        }
        const result: IUser = {
            expirationDate: expirationDate,
            id: dto.id,
            isEnabled: dto.isEnabled,
            name: dto.name,
        };
        return result;
    }

    public convertToDto(model: IUser): IUserDto {
        const result: IUserDto = {
            id: model.id,
            isEnabled: model.isEnabled,
            name: model.name,
        };
        if (model.expirationDate != null) {
            result.expirationDate = this._dateDtoConverter.convertToDto(model.expirationDate);
        }
        return result;
    }
}
