import Decimal from "decimal.js";
import * as querystring from 'querystring';
import * as rp from 'request-promise-native';
import { AuthenticationProvider } from "./authentication-provider";
import {
    IAccount,
    IAccountBalance,
    IAllocation,
    IApiKeyPermissions,
    IApiKeys,
    IAssetInsight,
    IBacktestAsset,
    IBacktestResult,
    ICandlestick,
    IExchangeAsset,
    IExchangeInfo,
    IHistoricalCandlestick,
    IHistoricalCount,
    IHistoricalOrderBook,
    IHistoricalInstrument,
    IHistoricalTrade,
    ILimitOrder,
    ILimitOrderStatus,
    IManagementStatus,
    IManagementUsage,
    IMarketOrderBooks,
    IStrategy,
    ITicker,
    ITotalBalanceHistoryItem,
    ITrade,
    ITradeChanges,
    ITradingPair,
    IUser,
} from "../models";
import {
    IAccountBalanceDto,
    IAccountDto,
    IAllocationDto,
    IApiKeyPermissionsDto,
    IApiKeysDto,
    IAssetInsightDto,
    IBacktestResultDto,
    IBacktestAssetDto,
    ICandlestickDto,
    IExchangeAssetDto,
    IExchangeInfoDto,
    IGuidIdResultDto,
    IHistoricalCandlestickDto,
    IHistoricalCountDto,
    IHistoricalOrderBookDto,
    IHistoricalInstrumentDto,
    IHistoricalTradeDto,
    ILimitOrderDto,
    ILimitOrderStatusDto,
    IMarketOrderBooksDto,
    INumberIdResultDto,
    IRebalancePeriodResultDto,
    IStrategyDto,
    ITickerDto,
    ITotalBalanceHistoryItemDto,
    ITradeChangesDto,
    ITradeDto,
    ITradingPairDto,
    IUserDto,
    IWebsocketTokenDto,
} from "../dtos";
import {
    AccountBalanceDtoConverter,
    AllocationDtoConverter,
    AssetInsightDtoConverter,
    BacktestAssetDtoConverter,
    BacktestDataPointDtoConverter,
    CandlestickDtoConverter,
    DateDtoConverter,
    DecimalDtoConverter,
    HistoricalCandlestickDtoConverter,
    HistoricalOrderBooksDtoConverter,
    HistoricalInstrumentsDtoConverter,
    HistoricalTradesDtoConverter,
    LimitOrderDtoConverter,
    LimitOrderStatusDtoConverter,
    MarketOrderBooksDtoConverter,
    StrategyDtoConverter,
    TickerDtoConverter,
    TotalBalanceHistoryItemDtoConverter,
    TradeChangesDtoConverter,
    TradeDtoConverter,
    UserDtoConverter,
} from "../dto-converters";

export class ShrimpyApiClient {
    private _accountBalanceDtoConverter = new AccountBalanceDtoConverter();
    private _allocationDtoConverter = new AllocationDtoConverter();
    private _assetInsightDtoConverter = new AssetInsightDtoConverter();
    private _backtestAssetDtoConveter = new BacktestAssetDtoConverter();
    private _backtestDataPointDtoConverter = new BacktestDataPointDtoConverter();
    private _candlestickDtoConverter = new CandlestickDtoConverter();
    private _dateDtoConverter = new DateDtoConverter();
    private _decimalDtoConverter = new DecimalDtoConverter();
    private _historicalCandlestickDtoConverter = new HistoricalCandlestickDtoConverter();
    private _historicalOrderBooksDtoConverter = new HistoricalOrderBooksDtoConverter();
    private _historicalInstrumentsDtoConverter = new HistoricalInstrumentsDtoConverter();
    private _historicalTradesDtoConverter = new HistoricalTradesDtoConverter();
    private _limitOrderDtoConverter = new LimitOrderDtoConverter();
    private _limitOrderStatusDtoConverter = new LimitOrderStatusDtoConverter();
    private _marketOrderBooksDtoConverter = new MarketOrderBooksDtoConverter();
    private _strategyDtoConverter = new StrategyDtoConverter();
    private _tickerDtoConverter = new TickerDtoConverter();
    private _totalBalanceHistoryItemDtoConverter = new TotalBalanceHistoryItemDtoConverter();
    private _tradeChangesDtoConverter = new TradeChangesDtoConverter();
    private _tradeDtoConverter = new TradeDtoConverter();
    private _userDtoConverter = new UserDtoConverter();

    private _authenticationProvider: AuthenticationProvider | null = null;

    constructor(
        publicKey?: string,
        privateKey?: string,
    ) {
        if (publicKey && privateKey) {
            // keys were supplied, use them
            this._setApiCredentials(publicKey, privateKey);
        }
    }

/* Public */

    public async getSupportedExchanges(): Promise<IExchangeInfo[]> {
        const endpoint = `list_exchanges`;
        return await this._callEndpoint<IExchangeInfoDto[]>(endpoint, 'GET', null, false);
    }

    public async getExchangeAssets(exchange: string): Promise<IExchangeAsset[]> {
        const endpoint = `exchanges/${exchange}/assets`;
        return await this._callEndpoint<IExchangeAssetDto[]>(endpoint, 'GET', null, false);
    }

    public async getTradingPairs(exchange: string): Promise<ITradingPair[]> {
        const endpoint = `exchanges/${exchange}/trading_pairs`;
        return await this._callEndpoint<ITradingPairDto[]>(endpoint, 'GET', null, false);
    }

/* Market Data */

    public async getTicker(exchange: string): Promise<ITicker[]> {
        const endpoint = `exchanges/${exchange}/ticker`;
        const tickerDtos = await this._callEndpoint<ITickerDto[]>(endpoint, 'GET', null, false);
        return tickerDtos.map((tickerDto) => {
            return this._tickerDtoConverter.convertFromDto(tickerDto);
        });
    }

    public async getOrderBooks(
        exchange: string | string[],
        baseSymbol?: string | string[],
        quoteSymbol?: string | string[],
        limit?: number
    ): Promise<IMarketOrderBooks[]> {
        const endpoint = `orderbooks`;
        let exchangeString: string;
        if (Array.isArray(exchange)) {
            exchangeString = exchange.join(',');
        } else {
            exchangeString = exchange;
        }
        const parameters: { exchange: string, baseSymbol?: string, quoteSymbol?: string, limit?: number } = {
            exchange: exchangeString
        };
        if (baseSymbol) {
            if (Array.isArray(baseSymbol)) {
                parameters.baseSymbol = baseSymbol.join(',');
            } else {
                parameters.baseSymbol = baseSymbol;
            }
        }
        if (quoteSymbol) {
            if (Array.isArray(quoteSymbol)) {
                parameters.quoteSymbol = quoteSymbol.join(',');
            } else {
                parameters.quoteSymbol = quoteSymbol;
            }
        }
        if (limit) {
            parameters.limit = limit;
        }
        const orderBooksListDto = await this._callEndpoint<IMarketOrderBooksDto[]>(endpoint, 'GET', parameters, false);
        return orderBooksListDto.map((orderBooksDto) => {
            return this._marketOrderBooksDtoConverter.convertFromDto(orderBooksDto);
        });
    }

    public async getCandles(
        exchange: string,
        baseTradingSymbol: string,
        quoteTradingSymbol: string,
        interval: '1m' | '5m' | '15m' | '1h' | '6h' | '1d',
        startTime?: Date,
    ): Promise<ICandlestick[]> {
        const endpoint = `exchanges/${exchange}/candles`;
        const parameters: {
            baseTradingSymbol: string,
            quoteTradingSymbol: string,
            interval: string,
            startTime?: string,
        } = {
            baseTradingSymbol: baseTradingSymbol,
            quoteTradingSymbol: quoteTradingSymbol,
            interval: interval,
        };
        if (startTime) {
            parameters.startTime = this._dateDtoConverter.convertToDto(startTime);
        }
        const candlestickDtos = await this._callEndpoint<ICandlestickDto[]>(endpoint, 'GET', parameters, false);
        const result: ICandlestick[] = candlestickDtos.map((candlestickDto) => {
            return this._candlestickDtoConverter.convertFromDto(candlestickDto);
        });
        return result;
    }

/* Users */

    public async getUsers(): Promise<IUser[]> {
        const endpoint = 'users';
        const userDtos = await this._callEndpoint<IUserDto[]>(endpoint, 'GET', null, true);
        return userDtos.map((userDto) => {
            return this._userDtoConverter.convertFromDto(userDto);
        });
    }

    public async getUser(userId: string): Promise<IUser> {
        const endpoint = `users/${userId}`;
        const userDto = await this._callEndpoint<IUserDto>(endpoint, 'GET', null, true);
        return this._userDtoConverter.convertFromDto(userDto);
    }

    public async createUser(name?: string): Promise<string> {
        const endpoint = 'users';
        let parameters: { [key: string]: any } | null = null;
        if (name) {
            parameters = { name: name };
        }
        const result = await this._callEndpoint<IGuidIdResultDto>(endpoint, 'POST', parameters, true);
        return result.id;
    }

    public async setUserName(userId: string, name: string): Promise<void> {
        const endpoint = `users/${userId}/name`;
        const parameters: { [key: string]: any } = {
            name: name
        };
        await this._callEndpoint<any>(endpoint, 'POST', parameters, true);
    }

    public async enableUser(userId: string): Promise<void> {
        // Deprecated, this endpoint no longer has any functionality
        // It has been preserved to avoid breaking deployments from library upgrades
        const endpoint = `users/${userId}/enable`;
        await this._callEndpoint<any>(endpoint, 'POST', null, true);
    }

    public async disableUser(userId: string): Promise<void> {
        // Deprecated, this endpoint no longer has any functionality
        // It has been preserved to avoid breaking deployments from library upgrades
        const endpoint = `users/${userId}/disable`;
        await this._callEndpoint<any>(endpoint, 'POST', null, true);
    }

/* User API Keys */

    public async getApiKeys(userId: string): Promise<string[]> {
        const endpoint = `users/${userId}/keys`;
        return await this._callEndpoint<string[]>(endpoint, 'GET', null, true);
    }

    public async createApiKeys(userId: string): Promise<IApiKeys> {
        const endpoint = `users/${userId}/keys`;
        return await this._callEndpoint<IApiKeysDto>(endpoint, 'POST', null, true);
    }

    public async deleteApiKeys(userId: string, publicKey: string): Promise<void> {
        const endpoint = `users/${userId}/keys/${publicKey}`;
        return await this._callEndpoint<any>(endpoint, 'DELETE', null, true);
    }

    public async getPermissions(userId: string, publicKey: string): Promise<IApiKeyPermissions> {
        const endpoint = `users/${userId}/keys/${publicKey}/permissions`;
        return await this._callEndpoint<IApiKeyPermissionsDto>(endpoint, 'GET', null, true);
    }

    public async setPermissions(
        userId: string,
        publicKey: string,
        account: boolean,
        trade: boolean,
    ): Promise<void> {
        const endpoint = `users/${userId}/keys/${publicKey}/permissions`;
        const parameters: IApiKeyPermissionsDto = {
            account: account,
            trade: trade
        };
        await this._callEndpoint<any>(endpoint, 'POST', parameters, true);
    }

/* Accounts */

    public async getAccounts(userId: string): Promise<IAccount[]> {
        const endpoint = `users/${userId}/accounts`;
        return await this._callEndpoint<IAccountDto[]>(endpoint, 'GET', null, true);
    }

    public async getAccount(userId: string, accountId: number): Promise<IAccount> {
        const endpoint = `users/${userId}/accounts/${accountId}`;
        return await this._callEndpoint<IAccountDto>(endpoint, 'GET', null, true);
    }

    public async createAccount(
        userId: string,
        exchange: string,
        publicKey: string,
        privateKey: string,
        passphrase?: string,
    ): Promise<number> {
        const endpoint = `users/${userId}/accounts`;
        const parameters: { [key: string]: any } = {
            exchange: exchange,
            publicKey: publicKey,
            privateKey: privateKey,
            passphrase: passphrase,
        };
        const result = await this._callEndpoint<INumberIdResultDto>(endpoint, 'POST', parameters, true);
        return result.id;
    }

    public async deleteAccount(userId: string, accountId: number): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}`;
        await this._callEndpoint<any>(endpoint, 'DELETE', null, true);
    }

    public async getIpWhitelistAddresses(userId: string): Promise<string[]> {
        const endpoint = `users/${userId}/whitelist`;
        return await this._callEndpoint<string[]>(endpoint, 'GET', null, true);
    }

/* Trading */

    public async createTrade(
        userId: string,
        accountId: number,
        fromSymbol: string,
        toSymbol: string,
        amount: Decimal,
        smartRouting?: boolean,
        maxSpreadPercent?: Decimal,
        maxSlippagePercent?: Decimal,
    ): Promise<string> {
        const endpoint = `users/${userId}/accounts/${accountId}/trades`;
        let parameters: {
            fromSymbol: string,
            toSymbol: string,
            amount: string,
            smartRouting?: boolean,
            maxSpreadPercent?: string,
            maxSlippagePercent?: string,
        } = {
            fromSymbol: fromSymbol,
            toSymbol: toSymbol,
            amount: this._decimalDtoConverter.convertToDto(amount),
        };
        if (smartRouting) {
            parameters.smartRouting = smartRouting;
        }
        if (maxSpreadPercent) {
            parameters.maxSpreadPercent = this._decimalDtoConverter.convertToDto(maxSpreadPercent);
        }
        if (maxSlippagePercent) {
            parameters.maxSlippagePercent = this._decimalDtoConverter.convertToDto(maxSlippagePercent);
        }
        const result = await this._callEndpoint<IGuidIdResultDto>(endpoint, 'POST', parameters, true);
        return result.id;
    }

    public async getTrade(
        userId: string,
        accountId: number,
        tradeId: string,
    ): Promise<ITradeChanges> {
        const endpoint = `users/${userId}/accounts/${accountId}/trades/${tradeId}`;
        const tradeChangesDto = await this._callEndpoint<ITradeChangesDto>(endpoint, 'GET', null, true);
        return this._tradeChangesDtoConverter.convertFromDto(tradeChangesDto);
    }

    public async getActiveTrades(userId: string, accountId: number): Promise<ITrade[]> {
        const endpoint = `users/${userId}/accounts/${accountId}/trades`;
        const tradeDtos = await this._callEndpoint<ITradeDto[]>(endpoint, 'GET', null, true);
        return tradeDtos.map((tradeDto) => {
            return this._tradeDtoConverter.convertFromDto(tradeDto);
        });
    }

/* Balances */

    public async getBalance(
        userId: string,
        accountId: number,
        date?: Date
    ): Promise<IAccountBalance> {
        const endpoint = `users/${userId}/accounts/${accountId}/balance`;
        let parameters: { date: string } | null = null;
        if (date) {
            parameters = { date: this._dateDtoConverter.convertToDto(date) };
        }
        const accountBalanceDto = await this._callEndpoint<IAccountBalanceDto>(endpoint, 'GET', parameters, true);
        return this._accountBalanceDtoConverter.convertFromDto(accountBalanceDto);
    }

    public async getTotalBalanceHistory(
        userId: string,
        accountId: number,
        startTime: Date | null,
        endTime: Date | null
    ): Promise<ITotalBalanceHistoryItem[]> {
        const endpoint = `users/${userId}/accounts/${accountId}/total_balance_history`;
        let parameters: {
            startTime?: string,
            endTime?: string
        } | null = null;
        if (startTime || endTime) {
            parameters = {};
            if (startTime) {
                parameters.startTime = this._dateDtoConverter.convertToDto(startTime);
            }
            if (endTime) {
                parameters.endTime = this._dateDtoConverter.convertToDto(endTime);
            }
        }
        const totalBalanceHistoryDtos = await this._callEndpoint<ITotalBalanceHistoryItemDto[]>(endpoint, 'GET', parameters, true);
        return totalBalanceHistoryDtos.map((totalBalanceHistoryDto) => {
            return this._totalBalanceHistoryItemDtoConverter.convertFromDto(totalBalanceHistoryDto);
        });
    }

/* Asset Management */

    public async rebalance(userId: string, accountId: number): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}/rebalance`;
        await this._callEndpoint<any>(endpoint, 'POST', null, true);
    }

    public async getRebalancePeriod(userId: string, accountId: number): Promise<number> {
        const endpoint = `users/${userId}/accounts/${accountId}/rebalance_period`;
        const result = await this._callEndpoint<IRebalancePeriodResultDto>(endpoint, 'GET', null, true);
        return result.rebalancePeriod;
    }

    public async setRebalancePeriod(
        userId: string,
        accountId: number,
        rebalancePeriodHours: number
    ): Promise<void> {
        // verify rebalancePeriodHours is an integer
        if (!Number.isInteger(rebalancePeriodHours)) {
            throw new Error("Invalid rebalance period. Rebalance period must be an integer");
        }
        const endpoint = `users/${userId}/accounts/${accountId}/rebalance_period`;
        const parameters: { rebalancePeriod: number } = {
            rebalancePeriod: rebalancePeriodHours
        };
        await this._callEndpoint<any>(endpoint, 'POST', parameters, true);
    }

    public async getStrategy(
        userId: string,
        accountId: number,
    ): Promise<IStrategy> {
        const endpoint = `users/${userId}/accounts/${accountId}/strategy`;
        const strategyDto = await this._callEndpoint<IStrategyDto>(endpoint, 'GET', null, true);
        return this._strategyDtoConverter.convertFromDto(strategyDto);
    }

    public async setStrategy(
        userId: string,
        accountId: number,
        strategy: IStrategy,
    ): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}/strategy`;
        let parameters: IStrategyDto = this._strategyDtoConverter.convertToDto(strategy);
        await this._callEndpoint<any>(endpoint, 'POST', parameters, true);
    }

    public async clearStrategy(
        userId: string,
        accountId: number,
    ): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}/strategy`;
        await this._callEndpoint<any>(endpoint, 'DELETE', null, true);
    }

    public async allocate(
        userId: string,
        accountId: number,
        strategy: IStrategy,
    ): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}/allocate`;
        let parameters: IStrategyDto = this._strategyDtoConverter.convertToDto(strategy);
        await this._callEndpoint<any>(endpoint, 'POST', parameters, true);
    }

/* Limit Orders */

    public async createOrder(
        userId: string,
        accountId: number,
        baseSymbol: string,
        quoteSymbol: string,
        quantity: Decimal,
        price: Decimal,
        side: "BUY" | "SELL",
        timeInForce: "GTC" | "IOC"
    ): Promise<string> {
        const endpoint = `users/${userId}/accounts/${accountId}/orders`;
        let parameters: { baseSymbol: string, quoteSymbol: string, quantity: string, price: string, side: string, timeInForce: string } = {
            baseSymbol: baseSymbol,
            quoteSymbol: quoteSymbol,
            quantity: this._decimalDtoConverter.convertToDto(quantity),
            price: this._decimalDtoConverter.convertToDto(price),
            side: side,
            timeInForce: timeInForce
        };
        const result = await this._callEndpoint<IGuidIdResultDto>(endpoint, 'POST', parameters, true);
        return result.id;
    }

    public async getOrder(
        userId: string,
        accountId: number,
        orderId: string
    ): Promise<ILimitOrderStatus> {
        const endpoint = `users/${userId}/accounts/${accountId}/orders/${orderId}`;
        const limitOrderStatusDto = await this._callEndpoint<ILimitOrderStatusDto>(endpoint, 'GET', null, true);
        return this._limitOrderStatusDtoConverter.convertFromDto(limitOrderStatusDto);
    }

    public async getOrders(
        userId: string,
        accountId: number
    ): Promise<ILimitOrder[]> {
        const endpoint = `users/${userId}/accounts/${accountId}/orders`;
        const limitOrderDtos = await this._callEndpoint<ILimitOrderDto[]>(endpoint, 'GET', null, true);
        return limitOrderDtos.map((limitOrderDto) => {
            return this._limitOrderDtoConverter.convertFromDto(limitOrderDto);
        });
    }

    public async cancelOrder(
        userId: string,
        accountId: number,
        orderId: string
    ): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}/orders/${orderId}`;
        await this._callEndpoint<any>(endpoint, 'DELETE', null, true);
    }

/* Analytics */

    public async getBacktestAssets(
        exchange: string,
        startTime?: Date,
        endTime?: Date
    ): Promise<IBacktestAsset[]> {
        const endpoint = `analytics/backtest/${exchange}/assets`;
        const parameters: { startTime?: string, endTime?: string } = {};
        if (startTime) {
            parameters.startTime = this._dateDtoConverter.convertToDto(startTime);
        }
        if (endTime) {
            parameters.endTime = this._dateDtoConverter.convertToDto(endTime);
        }
        const backtestAssetDtos = await this._callEndpoint<IBacktestAssetDto[]>(endpoint, 'GET', parameters, true);
        const result: IBacktestAsset[] = backtestAssetDtos.map((backtestAssetDto) => {
            return this._backtestAssetDtoConveter.convertFromDto(backtestAssetDto);
        });
        return result;
    }

    public async runBacktest(
        exchange: string,
        rebalancePeriodHours: number,
        fee: Decimal,
        startTime: Date,
        endTime: Date,
        initialValue: Decimal,
        allocations: IAllocation[]
    ): Promise<IBacktestResult> {
        const endpoint = `analytics/backtest/${exchange}/run`;
        const allocationsDto = allocations.map((allocation) => {
            return this._allocationDtoConverter.convertToDto(allocation);
        });
        const parameters: {
            rebalancePeriod: number,
            fee: string,
            startTime: string,
            endTime: string,
            initialValue: string,
            allocations: IAllocationDto[]
        } = {
            rebalancePeriod: rebalancePeriodHours,
            fee: fee.toString(),
            startTime: this._dateDtoConverter.convertToDto(startTime),
            endTime: this._dateDtoConverter.convertToDto(endTime),
            initialValue: initialValue.toString(),
            allocations: allocationsDto,
        };
        const resultDto = await this._callEndpoint<IBacktestResultDto>(endpoint, 'POST', parameters, true);
        const rebalanceData = resultDto.rebalanceData.map((dataPointDto) => {
            return this._backtestDataPointDtoConverter.convertFromDto(dataPointDto);
        });
        const holdingData = resultDto.holdingData.map((dataPointDto) => {
            return this._backtestDataPointDtoConverter.convertFromDto(dataPointDto);
        });
        const result: IBacktestResult = {
            rebalanceData: rebalanceData,
            holdingData: holdingData,
        };
        return result;
    }

/* Insights */

    public async getAssetDominance(): Promise<IAssetInsight[]> {
        const endpoint = `insights/asset_dominance`;
        const assetInsightDtos = await this._callEndpoint<IAssetInsightDto[]>(endpoint, 'GET', null, true);
        return assetInsightDtos.map((assetInsightDto) => {
            return this._assetInsightDtoConverter.convertFromDto(assetInsightDto);
        });
    }

    public async getAssetPopularity(): Promise<IAssetInsight[]> {
        const endpoint = `insights/asset_popularity`;
        const assetInsightDtos = await this._callEndpoint<IAssetInsightDto[]>(endpoint, 'GET', null, true);
        return assetInsightDtos.map((assetInsightDto) => {
            return this._assetInsightDtoConverter.convertFromDto(assetInsightDto);
        });
    }

/* Historical */

    public async getHistoricalTrades(
        exchange: string,
        baseTradingSymbol: string,
        quoteTradingSymbol: string,
        startTime: Date,
        endTime: Date,
        limit: number
    ): Promise<IHistoricalTrade[]> {
        const endpoint = `historical/trades`;
        const parameters: {
            exchange: string,
            baseTradingSymbol: string,
            quoteTradingSymbol: string,
            startTime: string,
            endTime: string,
            limit: number,
        } = {
            exchange: exchange,
            baseTradingSymbol: baseTradingSymbol,
            quoteTradingSymbol: quoteTradingSymbol,
            startTime: this._dateDtoConverter.convertToDto(startTime),
            endTime: this._dateDtoConverter.convertToDto(endTime),
            limit: limit,
        };
        const resultDto = await this._callEndpoint<IHistoricalTradeDto[]>(endpoint, 'GET', parameters, true);

        return this._historicalTradesDtoConverter.convertFromDto(resultDto);
    }

    public async getHistoricalOrderBooks(
        exchange: string,
        baseTradingSymbol: string,
        quoteTradingSymbol: string,
        startTime: Date,
        endTime: Date,
        limit: number
    ): Promise<IHistoricalOrderBook[]> {
        const endpoint = `historical/orderbooks`;
        const parameters: {
            exchange: string,
            baseTradingSymbol: string,
            quoteTradingSymbol: string,
            startTime: string,
            endTime: string,
            limit: number,
        } = {
            exchange: exchange,
            baseTradingSymbol: baseTradingSymbol,
            quoteTradingSymbol: quoteTradingSymbol,
            startTime: this._dateDtoConverter.convertToDto(startTime),
            endTime: this._dateDtoConverter.convertToDto(endTime),
            limit: limit,
        };
        const resultDto = await this._callEndpoint<IHistoricalOrderBookDto[]>(endpoint, 'GET', parameters, true);

        return this._historicalOrderBooksDtoConverter.convertFromDto(resultDto);
    }

    public async getHistoricalCandles(
        exchange: string,
        baseTradingSymbol: string,
        quoteTradingSymbol: string,
        startTime: Date,
        endTime: Date,
        limit: number,
        interval: '1m' | '5m' | '15m' | '1h' | '6h' | '1d'
    ): Promise<IHistoricalCandlestick[]> {
        const endpoint = `historical/candles`;
        const parameters: {
            exchange: string,
            baseTradingSymbol: string,
            quoteTradingSymbol: string,
            startTime: string,
            endTime: string,
            limit: number,
            interval: '1m' | '5m' | '15m' | '1h' | '6h' | '1d'
        } = {
            exchange: exchange,
            baseTradingSymbol: baseTradingSymbol,
            quoteTradingSymbol: quoteTradingSymbol,
            startTime: this._dateDtoConverter.convertToDto(startTime),
            endTime: this._dateDtoConverter.convertToDto(endTime),
            limit: limit,
            interval: interval
        };
        const resultDto = await this._callEndpoint<IHistoricalCandlestickDto[]>(endpoint, 'GET', parameters, true);
        const result = resultDto.map((candlestick) => {
            return this._historicalCandlestickDtoConverter.convertFromDto(candlestick);
        });

        return result;
    }

    public async getHistoricalInstruments(
        exchange?: string,
        baseTradingSymbol?: string,
        quoteTradingSymbol?: string
    ): Promise<IHistoricalInstrument[]> {
        const endpoint = `historical/instruments`;
        const parameters: {
            exchange?: string,
            baseTradingSymbol?: string,
            quoteTradingSymbol?: string
        } = {
            exchange: exchange,
            baseTradingSymbol: baseTradingSymbol,
            quoteTradingSymbol: quoteTradingSymbol
        };

        const resultDto = await this._callEndpoint<IHistoricalInstrumentDto[]>(endpoint, 'GET', parameters, true);

        return this._historicalInstrumentsDtoConverter.convertFromDto(resultDto);
    }

    public async getHistoricalCount(
        type: 'trade' | 'orderbook',
        exchange: string,
        baseTradingSymbol: string,
        quoteTradingSymbol: string,
        startTime: Date,
        endTime: Date
    ): Promise<IHistoricalCount> {
        const endpoint = `historical/count`;
        const parameters: {
            type: string,
            exchange: string,
            baseTradingSymbol: string,
            quoteTradingSymbol: string,
            startTime: string,
            endTime: string
        } = {
            type: type,
            exchange: exchange,
            baseTradingSymbol: baseTradingSymbol,
            quoteTradingSymbol: quoteTradingSymbol,
            startTime: this._dateDtoConverter.convertToDto(startTime),
            endTime: this._dateDtoConverter.convertToDto(endTime)
        };
        const countDto = await this._callEndpoint<IHistoricalCountDto>(endpoint, 'GET', parameters, true);
        const result: IHistoricalCount = {
            count: countDto.count
        };

        return result;
    }

/* Management */

    public async getStatus(): Promise<IManagementStatus> {
        const endpoint = `management/status`;
        return await this._callEndpoint<IManagementStatus>(endpoint, 'GET', null, true);
    }

    public async getUsage(): Promise<IManagementUsage> {
        const endpoint = `management/usage`;
        return await this._callEndpoint<IManagementUsage>(endpoint, 'GET', null, true);
    }

/* WebSocket */

    public async getToken(): Promise<string> {
        const endpoint = `ws/token`;
        const websocketTokenResult =  await this._callEndpoint<IWebsocketTokenDto>(endpoint, 'GET', null, true);

        return websocketTokenResult.token;
    }

/* private methods */

    private _setApiCredentials(publicKey: string, privateKey: string): void {
        this._authenticationProvider = new AuthenticationProvider(publicKey, privateKey);
    }

    private async _callEndpoint<T>(
        endPoint: string,
        method: 'GET' | 'POST' | 'DELETE',
        parameters: { [key: string]: any } | null,
        isSignRequired: boolean
    ): Promise<T> {
        let requestPath = "/v1/" + endPoint;
        let options: rp.OptionsWithUri & { headers: { [key: string]: any }} = {
            uri: "https://dev-api.shrimpy.io" + requestPath,
            headers: {
                'content-type': 'application/json',
            },
            method: method
        };

        if (method === 'GET' && parameters && Object.keys(parameters).length > 0) {
            const qs = '?' + querystring.stringify(parameters);
            options.uri += qs;
            requestPath += qs;
        }

        if (method === 'POST') {
            if (parameters) {
                // only attach the body if there are parameters
                // no parameters, send empty body
                options.body = JSON.stringify(parameters);
            } else {
                options.body = "";
            }
        }

        if (isSignRequired && !this._authenticationProvider) {
            throw new Error(`Cannot send a request to ${endPoint} without api keys. Make sure to pass api keys to the ShrimpyApiClient constructor.`);
        }

        if (this._authenticationProvider) {
            const nonce = Date.now();
            const bodyString = options.body ? options.body : "";
            const prehashString = requestPath + method + nonce + bodyString;
            const signature = this._authenticationProvider.sign(prehashString);
            options.headers['DEV-SHRIMPY-API-KEY'] = this._authenticationProvider.publicKey;
            options.headers['DEV-SHRIMPY-API-NONCE'] = nonce;
            options.headers['DEV-SHRIMPY-API-SIGNATURE'] = signature;
        }

        const response: string = await rp(options);
        return JSON.parse(response);
    }
}
