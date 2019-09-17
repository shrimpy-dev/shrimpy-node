import * as WebSocket from 'ws';
import { ISubscriptionRequest, IWebsocketMessage, IPingMessage, IErrorMessage } from '../models';


export class ShrimpyWsClient {
    private _websocket: WebSocket;
    private _subscriptionCallbacks: { 
        [subscription: string]: (data: IWebsocketMessage) => void
    } = {};

    private _websocketErrorCallback: (error: IErrorMessage) => void;

    constructor (errorCallback: (error: IErrorMessage) => void) {
        this._websocket = new WebSocket('wss://ws-feed.shrimpy.io/');
        this._websocketErrorCallback = errorCallback;
    }

    public connect() {
        
        this._websocket.on('open', function open() {
            // Open the connection
        });

        this._websocket.on('error', (error: Error) => {
            const wsError : IErrorMessage = {
                'type' : 'WebsocketClientError',
                'code' : 2404,
                'message' : error.message
            };
            this._websocketErrorCallback(wsError);
        });

        this._websocket.on('message', (message) => {
            const parsedMessage: IWebsocketMessage = JSON.parse(message.toString());
            const topic = this._getTopic(parsedMessage);

            if (topic === 'ping') {
                // Handle Ping
                this._pong(parsedMessage as IPingMessage);
                return;
            }

            if (topic === 'error') {
                this._websocketErrorCallback(parsedMessage as IErrorMessage);
                return;
            }

            const successCallback = this._subscriptionCallbacks[topic];
            if (successCallback !== undefined) {
                successCallback(parsedMessage);
            }
        });

        this._websocket.on('close', () => {
            // Connection has been closed, delete all callbacks
            this._subscriptionCallbacks = {};
        });
    }

    public disconnect() {
        if (this._websocket !== undefined) {
            this._websocket.close();
        }
    }

    public forceDisconnect() {
        if (this._websocket !== undefined) {
            this._websocket.terminate();
        }
    }

    public subscribe(
        subscriptionRequest: ISubscriptionRequest,
        successCallback: (data: IWebsocketMessage) => void,
    ) {
        if (this._websocket.OPEN == this._websocket.readyState) {
            const topic = this._getTopic(subscriptionRequest);
            this._subscriptionCallbacks[topic] = successCallback;
            this._websocket.send(JSON.stringify(subscriptionRequest));
        }
    }

    public unsubscribe(
        unsubscriptionRequest: ISubscriptionRequest
    ) {
        const topic = this._getTopic(unsubscriptionRequest);
        delete this._subscriptionCallbacks[topic];

        if (this._websocket.OPEN == this._websocket.readyState) {
            this._websocket.send(JSON.stringify(unsubscriptionRequest));
        }
    }

    public getReadyState(): number {
        return this._websocket.readyState;
    }

    private _getTopic(message: any): string {

        if (message.hasOwnProperty('type')) {
            const messageType = message['type'];
            if (messageType.indexOf('subscribe') === -1) {
                return messageType.toLowerCase();
            }
        }

        const exchange = message['exchange'];
        const pair = message['pair'];
        const channel = message['channel'];

        const rawKeys = [exchange.toLowerCase(), pair.toLowerCase(), channel.toLowerCase()];
        const nonNullKeys = rawKeys.filter((k) => {
            return k !== undefined;
        });

        return nonNullKeys.join('-');
    }

    private _pong(parsedData: IPingMessage) {
        const pong = {
            'type': 'pong',
            'data': parsedData.data
        };
        this._websocket.send(JSON.stringify(pong));
    }
}