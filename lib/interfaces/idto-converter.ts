
export interface IDtoConverter<TDto, TModel> {
    convertFromDto(dto: TDto): TModel;
    convertToDto(model: TModel): TDto;
}
