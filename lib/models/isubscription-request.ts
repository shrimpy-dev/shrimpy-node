export type ISubscriptionRequest = IExchangeSubscription | IOrderSubscription;

export interface IExchangeSubscription {
    type: 'subscribe' | 'unsubscribe';
    exchange: string;
    pair: string;
    channel: string;
}

export interface IOrderSubscription {
    channel: string;
}
