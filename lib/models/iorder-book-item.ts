import Decimal from "decimal.js";

export interface IOrderBookItem {
    price: Decimal;
    quantity: Decimal;
}
