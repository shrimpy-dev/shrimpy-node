import { IBacktestDataPoint } from './ibacktest-data-point';

export interface IBacktestResult {
    rebalanceData: IBacktestDataPoint[];
    holdingData: IBacktestDataPoint[];
}
