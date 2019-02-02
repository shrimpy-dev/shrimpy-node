import { IDtoConverter } from "../interfaces";
import Decimal from "decimal.js";

export class DecimalDtoConverter implements IDtoConverter<string, Decimal> {

    public convertFromDto(dto: string): Decimal {
        return new Decimal(dto);
    }

    public convertToDto(model: Decimal): string {
        return model.toString();
    }
}
