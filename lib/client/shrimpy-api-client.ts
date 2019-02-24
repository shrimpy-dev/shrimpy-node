import Decimal from "decimal.js";
import * as rp from 'request-promise-native';
import { AuthenticationProvider } from "./authentication-provider";
import {
    IAccount,
    IAccountBalance,
    IApiKeyPermissions,
    IApiKeys,
    IStrategy,
    ITicker,
    ITrade,
    ITradeChanges,
    IUser,
    IAllocation,
    IBacktestAsset,
    IBacktestResult,
} from "../models";
import {
    IAccountBalanceDto,
    IGuidIdResultDto,
    INumberIdResultDto,
    IRebalancePeriodResultDto,
    IStrategyDto,
    ITickerDto,
    ITradeChangesDto,
    ITradeDto,
    IUserDto,
    IAllocationDto,
    IBacktestResultDto,
    IBacktestAssetDto,    
} from "../dtos";
import {
    AccountBalanceDtoConverter,
    AllocationDtoConverter,
    BacktestAssetDtoConverter,
    BacktestDataPointDtoConverter,
    DateDtoConverter,
    DecimalDtoConverter,
    StrategyDtoConverter,
    TickerDtoConverter,
    TradeChangesDtoConverter,
    TradeDtoConverter,
    UserDtoConverter,
} from "../dto-converters";

export class ShrimpyApiClient {
    private _accountBalanceDtoConverter = new AccountBalanceDtoConverter();
    private _allocationDtoConverter = new AllocationDtoConverter();
    private _backtestAssetDtoConveter = new BacktestAssetDtoConverter();
    private _backtestDataPointDtoConverter = new BacktestDataPointDtoConverter();
    private _dateDtoConverter = new DateDtoConverter();
    private _decimalDtoConverter = new DecimalDtoConverter();
    private _userDtoConverter = new UserDtoConverter();
    private _strategyDtoConverter = new StrategyDtoConverter();
    private _tickerDtoConverter = new TickerDtoConverter();
    private _tradeChangesDtoConverter = new TradeChangesDtoConverter();
    private _tradeDtoConverter = new TradeDtoConverter();

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

    public async getSupportedExchanges(): Promise<string[]> {
        const endpoint = `exchanges`;
        return await this._callEndpoint<string[]>(endpoint, 'GET', null, false);
    }

    public async getTicker(exchange: string): Promise<ITicker[]> {
        const endpoint = `exchanges/${exchange}/ticker`;
        const tickerDtos = await this._callEndpoint<ITickerDto[]>(endpoint, 'GET', null, false);
        return tickerDtos.map((tickerDto) => {
            return this._tickerDtoConverter.convertFromDto(tickerDto);
        });
    }

    public async getBacktestAssets(
        exchange: string,
        startTime?: Date,
        endTime?: Date
    ): Promise<IBacktestAsset[]> {
        const endpoint = `analytics/backtest/${exchange}/assets`;
        let parameters: { startTime?: string, endTime?: string } = {};
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

    public async createUser(): Promise<string> {
        const endpoint = 'users';
        const result = await this._callEndpoint<IGuidIdResultDto>(endpoint, 'POST', null, true);
        return result.id;
    }

    public async enableUser(userId: string): Promise<void> {
        const endpoint = `users/${userId}/enable`;
        await this._callEndpoint<any>(endpoint, 'POST', null, true);
    }

    public async disableUser(userId: string): Promise<void> {
        const endpoint = `users/${userId}/disable`;
        await this._callEndpoint<any>(endpoint, 'POST', null, true);
    }

    public async createApiKeys(userId: string): Promise<IApiKeys> {
        const endpoint = `users/${userId}/keys`;
        return await this._callEndpoint<IApiKeys>(endpoint, 'POST', null, true);
    }

    public async deleteApiKeys(userId: string, publicKey: string): Promise<void> {
        const endpoint = `users/${userId}/keys/${publicKey}`;
        return await this._callEndpoint<any>(endpoint, 'DELETE', null, true);
    }

    public async getApiKeys(userId: string): Promise<string[]> {
        const endpoint = `users/${userId}/keys`;
        return await this._callEndpoint<string[]>(endpoint, 'GET', null, true);
    }

    public async setPermissions(
        userId: string,
        publicKey: string,
        account: boolean,
        trade: boolean,
    ): Promise<void> {
        const endpoint = `users/${userId}/keys/${publicKey}/permissions`;
        const parameters: IApiKeyPermissions = {
            account: account,
            trade: trade
        };
        await this._callEndpoint<any>(endpoint, 'POST', parameters, true);
    }

    public async getPermissions(userId: string, publicKey: string): Promise<IApiKeyPermissions> {
        const endpoint = `users/${userId}/keys/${publicKey}/permissions`;
        return await this._callEndpoint<IApiKeyPermissions>(endpoint, 'GET', null, true);
    }

    public async getAccounts(userId: string): Promise<IAccount[]> {
        const endpoint = `users/${userId}/accounts`;
        return await this._callEndpoint<IAccount[]>(endpoint, 'GET', null, true);
    }

    public async getAccount(userId: string, accountId: number): Promise<IAccount> {
        const endpoint = `users/${userId}/accounts/${accountId}`;
        return await this._callEndpoint<IAccount>(endpoint, 'GET', null, true);
    }

    public async createAccount(
        userId: string,
        exchange: string,
        publicKey: string,
        privateKey: string,
        passphrase: string,
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

    public async setStrategy(
        userId: string,
        accountId: number,
        strategy: IStrategy,
    ): Promise<void> {
        const endpoint = `users/${userId}/accounts/${accountId}/strategy`;
        let parameters: IStrategyDto = this._strategyDtoConverter.convertToDto(strategy);
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

    public async createTrade(
        userId: string,
        accountId: number,
        fromSymbol: string,
        toSymbol: string,
        amount: Decimal
    ): Promise<string> {
        const endpoint = `users/${userId}/accounts/${accountId}/trades`;
        let parameters: { fromSymbol: string, toSymbol: string, amount: string } = {
            fromSymbol: fromSymbol,
            toSymbol: toSymbol,
            amount: this._decimalDtoConverter.convertToDto(amount),
        };
        const result = await this._callEndpoint<IGuidIdResultDto>(endpoint, 'POST', parameters, true);
        return result.id;
    }

    public async getActiveTrades(userId: string, accountId: number): Promise<ITrade[]> {
        const endpoint = `users/${userId}/accounts/${accountId}/trades`;
        const tradeDtos = await this._callEndpoint<ITradeDto[]>(endpoint, 'GET', null, true);
        return tradeDtos.map((tradeDto) => {
            return this._tradeDtoConverter.convertFromDto(tradeDto);
        });
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

    public async getBalance(userId: string, accountId: number): Promise<IAccountBalance> {
        const endpoint = `users/${userId}/accounts/${accountId}/balance`;
        const accountBalanceDto = await this._callEndpoint<IAccountBalanceDto>(endpoint, 'GET', null, true);
        return this._accountBalanceDtoConverter.convertFromDto(accountBalanceDto);
    }

    private _setApiCredentials(publicKey: string, privateKey: string): void {
        this._authenticationProvider = new AuthenticationProvider(publicKey, privateKey);
    }

    private async _callEndpoint<T>(
        endPoint: string,
        method: 'GET' | 'POST' | 'DELETE',
        parameters: { [key: string]: any } | null,
        signed: boolean
    ): Promise<T> {
        
        const pathname = "/v1/" + endPoint;
        let options: rp.OptionsWithUri & { headers: { [key: string]: any }} = {
            uri: "https://dev-api.shrimpy.io" + pathname,
            headers: {
                'content-type': 'application/json',
            },
            method: method
        };

        if (method === 'GET' && parameters && Object.keys(parameters).length > 0) {
            options.qs = parameters;
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

        if (signed) {
            // this method is signed, create the signature
            if (!this._authenticationProvider) {
                throw new Error(`Cannot send a request to ${endPoint} without api keys. Make sure to pass api keys to the ShrimpyApiClient constructor.`);
            }
            const nonce = Date.now();
            const bodyString = options.body ? options.body : "";
            const prehashString = pathname + method + nonce + bodyString;
            const signature = this._authenticationProvider.sign(prehashString);
            options.headers['DEV-SHRIMPY-API-KEY'] = this._authenticationProvider.publicKey;
            options.headers['DEV-SHRIMPY-API-NONCE'] = nonce;
            options.headers['DEV-SHRIMPY-API-SIGNATURE'] = signature;
        }

        const response: string = await rp(options);
        return JSON.parse(response);
    }
}
