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
const Shrimpy = require('@shrimpy-node')
const publicClient = new Shrimpy.ShrimpyApiClient();
```

The public client can only use public methods.

### Private Client

```js
const publicKey = 'your_public_key';   // e.g. 12326758a39a720e15d064cab3c1f0a9332d107de453bd41926bb3acd565059e
const privateKey = 'your_private_key'; // e.g. 6991cf4c9b518293429db0df6085d1731074bed8abccd7f0279a52fac5b0c1a8a2f6d28e11a50fbb1c6575d1407e637f9ad7c73fbddfa87c5d418fd58971f829
const Shrimpy = require('@shrimpy-node')
const privateClient = new Shrimpy.ShrimpyApiClient(publicKey, privateKey);
```

The private client can use public and private methods.

### Public Methods

* [`getTicker`](https://developers.shrimpy.io/docs/#get-ticker)

```js
const ticker = await client.getTicker(
    'kucoin' // exchange
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

### Trading Methods

* [`getBalance`](https://developers.shrimpy.io/docs/#get-balance)
```js
const balance = await client.getBalance(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8', // userId
    123                                     // accountId
);
```

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
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',                                                                 // userId
    123,                                                                                                    // accountId
    { isDynamic: false, allocations: [{ symbol: 'BTC', percent: '50' }, { symbol: 'ETH', percent: '50' }] } // strategy
);
```

* [`allocate`](https://developers.shrimpy.io/docs/#allocating)
```js
await client.allocate(
    '701e0d16-1e9e-42c9-b6a1-4cada1f395b8',                                 // userId
    123,                                                                    // accountId
    { isDynamic: false, allocations: [{ symbol: 'USDT', percent: '100' }] } // strategy
);
```

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
