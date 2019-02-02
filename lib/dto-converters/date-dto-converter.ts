import { IDtoConverter } from "../interfaces";

export class DateDtoConverter implements IDtoConverter<string, Date> {

    public convertFromDto(dto: string): Date {
        return new Date(dto);
    }

    public convertToDto(model: Date): string {
        return model.toISOString();
    }
}
