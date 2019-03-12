import { IOrderBookItemDto } from "./iorder-book-item-dto";

export interface IOrderBookDto {
    asks: IOrderBookItemDto[];
    bids: IOrderBookItemDto[];
}
