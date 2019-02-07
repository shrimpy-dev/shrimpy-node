import { IBacktestDataPointDto } from './ibacktest-data-point-dto';

export interface IBacktestResultDto {
    rebalanceData: IBacktestDataPointDto[];
    holdingData: IBacktestDataPointDto[];
}
