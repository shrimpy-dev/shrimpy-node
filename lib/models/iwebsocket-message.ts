import { IOrderBookItem } from "./iorder-book-item";
import { ITradeItem } from "./itrade-item";

export type IWebsocketMessage = IExchangePairMessage | IOrderMessage | IErrorMessage | IPingMessage;

export interface IExchangePairMessage {
    exchange: string;
    pair: string;
    channel: 'bbo' | 'orderbook' | 'trades'
    content: WebsocketContent
}

export interface IOrderMessage {
    channel: 'orders';
    content: WebsocketContent;
}

export interface IErrorMessage {
    type: string;
    code: number;
    message: string;
}

export interface IPingMessage {
    type: string;
    data: number;
}

export type WebsocketContent = OrderBookContent | TradeContent | OrdersContent;

export interface OrderBookContent {
    sequence: number;
    asks: IOrderBookItem[];
    bids: IOrderBookItem[];
}

export interface TradeContent {
    trades: ITradeItem[];
}

export type OrdersContent = string[];
