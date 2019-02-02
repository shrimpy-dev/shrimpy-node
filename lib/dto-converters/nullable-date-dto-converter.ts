import { DateDtoConverter } from "./date-dto-converter";
import { IDtoConverter } from "../interfaces";

export class NullableDateDtoConverter implements IDtoConverter<string | null, Date | null> {
    private _DateDtoConverter = new DateDtoConverter();

    public convertFromDto(dto: string | null): Date | null {
        if (dto) {
            return this._DateDtoConverter.convertFromDto(dto);
        } else {
            return null;
        }
    }

    public convertToDto(model: Date | null): string | null {
        if (model) {
            return this._DateDtoConverter.convertToDto(model);
        } else {
            return null;
        }
    }
}
