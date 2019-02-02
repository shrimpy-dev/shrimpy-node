import Decimal from "decimal.js";
import { DecimalDtoConverter } from "./decimal-dto-converter";
import { IDtoConverter } from "../interfaces";

export class NullableDecimalDtoConverter implements IDtoConverter<string | null, Decimal | null> {
    private _decimalDtoConverter = new DecimalDtoConverter();

    public convertFromDto(dto: string | null): Decimal | null {
        if (dto) {
            return this._decimalDtoConverter.convertFromDto(dto);
        } else {
            return null;
        }
    }

    public convertToDto(model: Decimal | null): string | null {
        if (model) {
            return this._decimalDtoConverter.convertToDto(model);
        } else {
            return null;
        }
    }
}
