# shrimpy-node
The official Node.js library for the Shrimpy Developer API https://developers.shrimpy.io/docs

## Installation

```bash
npm install shrimpy-node
```

You can learn about the API responses of each endpoint [by reading our documentation](https://developers.shrimpy.io/docs).

## Quick Start

All asynchronous methods return promises.

### Promise Example

```js
client
    .getTicker('kucoin')
    .then(data => {
        // do something with the data
    })
    .catch(error => {
         // handle the error
    });
```

### Async Example

The promises can be used as expected in `async` functions in ES2017+ environments:

```js
async function yourFunction() {
    try {
        const ticker = await client.getTicker('kucoin');
        // do something with the data
    } catch (error) {
        // handle the error
    }
}
```

### Public Client

```js
const Shrimpy = require('shrimpy-node');
const publicClient = new Shrimpy.ShrimpyApiClient();
```

The public client can only use public methods.

### Private Client

```js
const publicKey = 'your_public_key';   // e.g. 12326758a39a720e15d064cab3c1f0a9332d107de453bd41926bb3acd565059e
const privateKey = 'your_private_key'; // e.g. 6991cf4c9b518293429db0df6085d1731074bed8abccd7f0279a52fac5b0c1a8a2f6d28e11a50fbb1c6575d1407e637f9ad7c73fbddfa87c5d418fd58971f829
const Shrimpy = require('shrimpy-node');
const privateClient = new Shrimpy.ShrimpyApiClient(publicKey, privateKey);
```

The private client can use public and private methods.

### Public Methods

* [`getSupportedExchanges`](https://developers.shrimpy.io/docs/#get-supported-exchanges)

```js
const supportedExchanges = await client.getSupportedExchanges();
```

* [`getExchangeAssets`](https://developers.shrimpy.io/docs/#get-exchange-assets)

```js
const exchangeAssets = await client.getExchangeAssets(
    'coinbasepro' // exchange
);
```

* [`getTradingPairs`](https://developers.shrimpy.io/docs/#get-trading-pairs)

```js
const tradingPairs = await client.getTradingPairs(
    'coinbasepro' // exchange
);
```

### Market Data Methods

* [`getTicker`](https://developers.shrimpy.io/docs/#get-ticker)

```js
const ticker = await client.getTicker(
    'kucoin' // exchange
);
```

* [`getOrderBooks`](https://developers.shrimpy.io/docs/#get-order-books)

```js
const orderBooks = await client.getOrderBooks(
    'bittrex',  // exchange
    'XLM',      // baseSymbol
    'BTC',      // quoteSymbol
    10          // limit
);
```

* [`getCandles`](https://developers.shrimpy.io/docs/#get-candles)

```js
const candles = await client.getCandles(
    'bittrex',  // exchange
    'XLM',      // baseTradingSymbol
    'BTC',      // quoteTradingSymbol
    '15m'       // interval
);
```

### User Methods

* [`getUsers`](https://developers.shrimpy.io/docs/#list-users)
```js
const users = await client.getUsers();
```

* [`getUser`](https://developers.shrimpy.io/docs/#get-a-user)
```js
const user = await client.getUser(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' //userId
);
```

* [`createUser`](https://developers.shrimpy.io/docs/#creating-a-user)
```js
const userId = await client.createUser();
```

* [`setUserName`](https://developers.shrimpy.io/docs/#naming-a-user)
```js
await client.setUserName(
    'mycustomname' // name
);
```

* [`enableUser`](https://developers.shrimpy.io/docs/#enabling-a-user)
```js
await client.enableUser(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' //userId
);
```

* [`disableUser`](https://developers.shrimpy.io/docs/#disabling-a-user)
```js
await client.disableUser(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' //userId
);
```

### User API Keys Methods

* [`getApiKeys`](https://developers.shrimpy.io/docs/#get-api-keys)
```js
const publicKeys = await client.getApiKeys(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' //userId
);
```

* [`createApiKeys`](https://developers.shrimpy.io/docs/#create-api-keys)
```js
const apiKeys = await client.createApiKeys(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' // userId
);
```

* [`deleteApiKeys`](https://developers.shrimpy.io/docs/#delete-api-keys)
```js
const apiKeys = await client.deleteApiKeys(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',                            // userId
    '51ac18b7d208f59b3c88acbb1ecefe6ba6be6ea4edc07e7a2450307ddc27ab80' // publicKey
);
```

* [`getPermissions`](https://developers.shrimpy.io/docs/#get-api-key-permissions)
```js
const permissions = await client.getPermissions(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',                            // userId
    '51ac18b7d208f59b3c88acbb1ecefe6ba6be6ea4edc07e7a2450307ddc27ab80' // publicKey
);
```

* [`setPermissions`](https://developers.shrimpy.io/docs/#set-api-key-permissions)
```js
await client.setPermissions(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',                             // userId
    '51ac18b7d208f59b3c88acbb1ecefe6ba6be6ea4edc07e7a2450307ddc27ab80', // publicKey
    true,                                                               // enable account methods
    false                                                               // enable trading methods
);
```

### Account Methods

* [`getAccounts`](https://developers.shrimpy.io/docs/#list-accounts)
```js
const accounts = await client.getAccounts(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' // userId
);
```

* [`getAccount`](https://developers.shrimpy.io/docs/#get-an-account)
```js
const account = await client.getAccount(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

* [`createAccount`](https://developers.shrimpy.io/docs/#link-an-exchange-account)
```js
const accountId = await client.createAccount(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',                             // userId
    'binance',                                                          // exchange
    'GOelL5FT6TklPxAzICIQK25aqct52T2lHoKvtcwsFla5sbVXmeePqVJaoXmXI6Qd', // publicKey (a.k.a. apiKey)
    'SelUuFq1sF2zGd97Lmfbb4ghITeziKo9IvM5NltjEdffatRN1N5vfHXIU6dsqRQw'  // privateKey (a.k.a. secretKey
);
```
Note: The `createAccount` method accepts a fifth optional parameter: **passphrase**. The passphrase is only required for some exchanges, such as Coinbase Pro.

* [`deleteAccount`](https://developers.shrimpy.io/docs/#unlink-an-exchange-account)
```js
await client.deleteAccount(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    456                                     // accountId
);
```

* [`getIpWhitelistAddresses`](https://developers.shrimpy.io/docs/#get-ip-whitelist-addresses)
```js
const IpAddresses = await client.getIpWhitelistAddresses(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8' // userId
);
```

### Trading Methods

* [`createTrade`](https://developers.shrimpy.io/docs/#creating-a-trade)
```js
const tradeId = await client.createTrade(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // accountId
    'BTC',                                  // fromSymbol
    'ETH',                                  // toSymbol
    new Decimal('0.01')                     // amount of fromSymbol
);
```

* [`getTrade`](https://developers.shrimpy.io/docs/#get-trade-status)
```js
const trade = await client.getTrade(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // exchangeAccountId
    '72dff099-54c0-4a32-b046-5c19d4f55758'  // tradeId
);
```

* [`getActiveTrades`](https://developers.shrimpy.io/docs/#list-active-trades)
```js
const activeTrades = await client.getActiveTrades(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // exchangeAccountId
);
```

### Balance Methods

* [`getBalance`](https://developers.shrimpy.io/docs/#get-balance)
```js
const balance = await client.getBalance(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

* [`getTotalBalanceHistory`](https://developers.shrimpy.io/docs/#get-total-balance-history)
```js
const totalBalanceHistory = await client.getTotalBalanceHistory(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

### Asset Management Methods

* [`rebalance`](https://developers.shrimpy.io/docs/#rebalancing)
```js
await client.rebalance(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

* [`getRebalancePeriod`](https://developers.shrimpy.io/docs/#get-the-rebalance-period)
```js
const rebalancePeriodHours = await client.getRebalancePeriod(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

* [`setRebalancePeriod`](https://developers.shrimpy.io/docs/#set-the-rebalance-period)
```js
await client.setRebalancePeriod(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // accountId
    24                                      // rebalancePeriod in hours
);
```

* [`getStrategy`](https://developers.shrimpy.io/docs/#get-the-strategy)
```js
const strategy = await client.getStrategy(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

* [`setStrategy`](https://developers.shrimpy.io/docs/#set-the-strategy)
```js
await client.setStrategy(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',   // userId
    123,                                      // accountId
    {
        isDynamic: false,
        allocations: [
            { symbol: 'BTC', percent: '50' },
            { symbol: 'ETH', percent: '50' }
        ]
    }                                         // strategy
);
```

* [`clearStrategy`](https://developers.shrimpy.io/docs/#clear-the-strategy)
```js
await client.clearStrategy(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',   // userId
    123                                       // accountId
);
```

* [`allocate`](https://developers.shrimpy.io/docs/#allocating)
```js
await client.allocate(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',    // userId
    123,                                       // accountId
    {
        isDynamic: false,
        allocations: [
            { symbol: 'USDT', percent: '100' }
        ]
    }                                          // strategy
);
```

### Limit Order Methods

* [`createOrder`](https://developers.shrimpy.io/docs/#place-a-limit-order)
```js
const orderId = await client.createOrder(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // accountId
    'ETH',                                  // baseSymbol
    'BTC',                                  // quoteSymbol
    new Decimal('0.01'),                    // quantity of baseSymbol
    new Decimal('0.026'),                   // price
    'SELL',                                 // side
    'IOC',                                  // timeInForce
);
```

* [`getOrder`](https://developers.shrimpy.io/docs/#get-limit-order-status)
```js
const order = await client.getOrder(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // accountId
    '8c2a9401-eb5b-48eb-9ae2-e9e02c174058'  // orderId
);
```

* [`getOrders`](https://developers.shrimpy.io/docs/#list-open-orders)
```js
const order = await client.getOrders(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

* [`cancelOrder`](https://developers.shrimpy.io/docs/#cancel-a-limit-order)
```js
const order = await client.cancelOrder(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123,                                    // accountId
    '8c2a9401-eb5b-48eb-9ae2-e9e02c174058'  // orderId
);
```

### Analytics Methods

* [`getBacktestAssets`](https://developers.shrimpy.io/docs/#get-backtest-assets)
```js
const backtestAssets = await client.getBacktestAssets(
    'kucoin' // exchange
);
```

* [`runBacktest`](https://developers.shrimpy.io/docs/#run-backtest)
```js
const backtestResults = await client.runBacktest(
    'binance',                                       // exchange
    10,                                              // rebalancePeriod in hours
    new Decimal(0.1),                                // fee in percent
    new Date("2018-05-19T00:00:00.000Z"),            // startTime
    new Date("2018-11-02T00:00:00.000Z"),            // endTime
    new Decimal(5000),                               // initialValue in USD
    [
        { symbol: "BTC", percent: new Decimal(50) },
        { symbol: "ETH", percent: new Decimal(50) }
    ]                                                // allocations
);
```

### Insight Methods

* [`getAssetDominance`](https://developers.shrimpy.io/docs/#get-asset-dominance)
```js
const assetDominance = await client.getAssetDominance();
```

* [`getAssetPopularity`](https://developers.shrimpy.io/docs/#get-asset-popularity)
```js
const assetPopularity = await client.getAssetPopularity();
```

### Historical Methods

* [`getHistoricalCount`](https://developers.shrimpy.io/docs/#get-historical-count)
```js
const count = await client.getHistoricalCount(
    'trade',                                        // type
    'binance',                                      // exchange
    'LTC',                                          // baseTradingSymbol
    'BTC',                                          // quoteTradingSymbol
    new Date("2018-05-19T01:00:00.000Z"),           // startTime
    new Date("2018-11-02T02:00:00.000Z")            // endTime
);
```

* [`getHistoricalInstruments`](https://developers.shrimpy.io/docs/#get-historical-instruments)
```js
const instruments = await client.getHistoricalInstruments();
const bittrexInstruments = await client.getHistoricalInstruments('bittrex');
```

* [`getHistoricalTrades`](https://developers.shrimpy.io/docs/#get-historical-trades)
```js
const trades = await client.getHistoricalTrades(
    'binance',                                      // exchange
    'LTC',                                          // baseTradingSymbol
    'BTC',                                          // quoteTradingSymbol
    new Date("2018-05-19T00:00:00.000Z"),           // startTime
    new Date("2018-11-02T00:00:00.000Z"),           // endTime
    100                                             // limit
);
```

* [`getHistoricalOrderBooks`](https://developers.shrimpy.io/docs/#get-historical-orderbooks)
```js
const orderbooks = await client.getHistoricalOrderBooks(
    'binance',                                      // exchange
    'LTC',                                          // baseTradingSymbol
    'BTC',                                          // quoteTradingSymbol
    new Date("2018-05-19T00:00:00.000Z"),           // startTime
    new Date("2018-11-02T00:00:00.000Z"),           // endTime
    100                                             // limit
);
```

### API Management Methods

* [`getStatus`](https://developers.shrimpy.io/docs/#get-status)
```js
const status = await client.getStatus();
```

* [`getUsage`](https://developers.shrimpy.io/docs/#get-usage)
```js
const usage = await client.getUsage();
```

## Websocket

Users can access the Shrimpy websocket feed using the [`ShrimpyWsClient`](https://github.com/shrimpy-dev/shrimpy-node/blob/master/lib/client/shrimpy-ws-client.ts) class. A handler must be passed in on subscription
that is responsible for processing incoming messages from the websocket stream. It is recommended that you simply send the message
to another processing thread from your custom handler to prevent blocking the incoming message stream.

The client handles pings to the Shrimpy server based on the [`API Documentation`](https://developers.shrimpy.io/docs/#websocket)


```js
import { ShrimpyApiClient, ShrimpyWsClient, ISubscriptionRequest, IWebsocketMessage, IErrorMessage } from 'shrimpy-node';


let errorHandler = (error: IErrorMessage) => { console.log(error) };

const publicKey = 'your_public_key';
const privateKey = 'your_private_key';
let shrimpyApiClient = new ShrimpyApiClient(publicKey, privateKey);

// Fetch the token from the Shrimpy API
let token = shrimpyApiClient.getToken();
let shrimpyWsclient = new ShrimpyWsClient(errorHandler, token);

const subscribeData: ISubscriptionRequest = {
    "type": "subscribe",
    "pair": "btc-usd",
    "exchange": "coinbasepro",
    "channel": "trade"
};

const unsubscribeData : ISubscriptionRequest = {
    "type": "unsubscribe",
    "pair": "btc-usd",
    "exchange": "coinbasepro",
    "channel": "trade"
};

let handler = (msg: IWebsocketMessage) => { console.log(msg); };

client.connect();
client.subscribe(subscribeData, handler);
client.unsubscribe(unsubscribeData);
client.forceDisconnect();

```
