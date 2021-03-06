﻿import { Decimal } from 'decimal.js';

export interface ICandlestick {
    open: Decimal;
    high: Decimal;
    low: Decimal;
    close: Decimal;
    volume: Decimal;
    quoteVolume: number;
    btcVolume: number;
    usdVolume: number;
    time: Date;
}
