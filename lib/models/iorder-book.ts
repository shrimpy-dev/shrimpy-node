import { IOrderBookItem } from "./iorder-book-item";

export interface IOrderBook {
    asks: IOrderBookItem[];
    bids: IOrderBookItem[];
}
