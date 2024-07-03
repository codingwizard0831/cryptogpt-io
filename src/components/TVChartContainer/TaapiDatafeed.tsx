import {
    Bar,
    IBasicDataFeed,
    OnReadyCallback,
    ResolutionString,
    LibrarySymbolInfo,
    DatafeedConfiguration,
    SearchSymbolsCallback,
} from "public/static/charting_library/charting_library";

const TaapiDatafeedFunc = (apiKey: string): IBasicDataFeed => {
    const subscribers: { [key: string]: NodeJS.Timeout } = {};

    const fetchLatestBars = async (symbolInfo: LibrarySymbolInfo, resolution: string, onRealtimeCallback: (bar: Bar) => void) => {
        try {
            const interval = resolution === 'D' ? '1d' : resolution;
            const url = `https://api.taapi.io/candles?secret=${apiKey}&exchange=binance&symbol=${symbolInfo.name}&interval=${interval}&limit=1`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                console.error(data.error);
                return;
            }

            const bar = data[0];
            const latestBar: Bar = {
                time: bar.timestamp * 1000,
                low: bar.low,
                high: bar.high,
                open: bar.open,
                close: bar.close,
                volume: bar.volume,
            };

            onRealtimeCallback(latestBar);
        } catch (error) {
            console.error(error);
        }
    };

    const subscribeBars = (
        symbolInfo: LibrarySymbolInfo,
        resolution: string,
        onRealtimeCallback: (bar: Bar) => void,
        subscribeUID: string,
        onResetCacheNeededCallback: () => void
    ) => {
        if (subscribers[subscribeUID]) {
            clearInterval(subscribers[subscribeUID]);
        }

        subscribers[subscribeUID] = setInterval(() => {
            fetchLatestBars(symbolInfo, resolution, onRealtimeCallback);
        }, 60000); // Fetch new data every minute (adjust as needed)
    };

    const unsubscribeBars = (subscriberUID: string) => {
        clearInterval(subscribers[subscriberUID]);
        delete subscribers[subscriberUID];
    };

    const searchSymbols = async (userInput: string, exchange: string, symbolType: string, onResultReadyCallback: SearchSymbolsCallback) => {
        onResultReadyCallback([]);
    };

    const configurationData: DatafeedConfiguration = {
        supported_resolutions: ["15", "30", "60", "120", "240", "360", "D", "W", "M"] as ResolutionString[],
    };

    return {
        onReady: (callback: OnReadyCallback) => {
            callback(configurationData);
        },
        searchSymbols,
        // resolveSymbol: async (symbolName: string, onResolve: ResolveCallback, onError: (error: any) => void, extension?: SymbolResolveExtension) => {
        //     try {
        //         const url = `https://api.taapi.io/exchange-symbols?secret=${apiKey}&exchange=binance`;
        //         const response = await fetch(url);
        //         const data = await response.json();

        //         if (data.error) {
        //             onError(new DOMException("tv: [resolveSymbol]: err Cannot resolve symbol"));
        //             return;
        //         }

        //         const symbolInfo: LibrarySymbolInfo = {
        //             // name: symbolName,
        //             // ticker: symbolName,
        //             ticker: 'BTCUSD',
        //             name: 'BTCUSD',
        //             description: "Description",
        //             type: 'crypto',
        //             session: "24x7",
        //             exchange: '',
        //             listed_exchange: "",
        //             timezone: "Etc/UTC",
        //             format: "price",
        //             pricescale: 100,
        //             minmov: 1,
        //             has_intraday: false,
        //             has_weekly_and_monthly: false,
        //             supported_resolutions: configurationData.supported_resolutions as ResolutionString[],
        //             volume_precision: 8,
        //             data_status: "streaming",
        //         };

        //         onResolve(symbolInfo);
        //     } catch (e) {
        //         onError(e);
        //     }
        // },
        // getBars: async (
        //     symbolInfo: LibrarySymbolInfo,
        //     resolution: ResolutionString,
        //     periodParams: PeriodParams,
        //     onResult: HistoryCallback,
        //     onErrorCallback: (error: any) => any
        // ) => {
        //     try {
        //         // const url = `https://api.taapi.io/candles?secret=${apiKey}&exchange=binance&symbol=${symbolInfo.name}&interval=1h`;
        //         // const response = await fetch(url);
        //         // const data = await response.json();

        //         // if (data.error) {
        //         //     onErrorCallback(data.error);
        //         //     return;
        //         // }


        //         const dummy = [
        //             {
        //                 "time": 1719878400000,
        //                 "low": 61875.55,
        //                 "high": 62080.73,
        //                 "open": 61939.1,
        //                 "close": 62012.01,
        //                 "volume": 458.46831
        //             },
        //             {
        //                 "time": 1719878400000,
        //                 "low": 61903.41,
        //                 "high": 62089.61,
        //                 "open": 62012.01,
        //                 "close": 61958.02,
        //                 "volume": 440.44409
        //             },
        //             {
        //                 "time": 1719878400000,
        //                 "low": 61958.02,
        //                 "high": 62113.63,
        //                 "open": 61958.03,
        //                 "close": 62090.01,
        //                 "volume": 298.89309
        //             },
        //             {
        //                 "time": 1719878400000,
        //                 "low": 62078.53,
        //                 "high": 62181.24,
        //                 "open": 62090.01,
        //                 "close": 62135.47,
        //                 "volume": 230.61034
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 62093.36,
        //                 "high": 62285.94,
        //                 "open": 62135.46,
        //                 "close": 62094.02,
        //                 "volume": 364.83454
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 61228.8,
        //                 "high": 62218,
        //                 "open": 62094.02,
        //                 "close": 61617.91,
        //                 "volume": 1595.13007
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 61245.96,
        //                 "high": 61617.91,
        //                 "open": 61617.9,
        //                 "close": 61362,
        //                 "volume": 1459.75063
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60600,
        //                 "high": 61371.19,
        //                 "open": 61362.01,
        //                 "close": 60987.99,
        //                 "volume": 1725.86161
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60816,
        //                 "high": 60988,
        //                 "open": 60988,
        //                 "close": 60883.9,
        //                 "volume": 581.25951
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60859.53,
        //                 "high": 61121.52,
        //                 "open": 60883.89,
        //                 "close": 61121.52,
        //                 "volume": 574.89166
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60976.56,
        //                 "high": 61181.84,
        //                 "open": 61121.52,
        //                 "close": 61014,
        //                 "volume": 589.70734
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60845.01,
        //                 "high": 61029.39,
        //                 "open": 61014,
        //                 "close": 60870.01,
        //                 "volume": 610.744489999943
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60390,
        //                 "high": 60978.19,
        //                 "open": 60870.01,
        //                 "close": 60491.99,
        //                 "volume": 3119.2612400014114
        //             },
        //             {
        //                 "time": 1719964800000,
        //                 "low": 60320,
        //                 "high": 60646,
        //                 "open": 60497.99,
        //                 "close": 60579.12,
        //                 "volume": 659.8241299999248
        //             }
        //         ]

        //         // const bars: Bar[] = data.map((bar: any) => ({
        //         //     time: bar.timestamp * 1000,
        //         //     low: bar.low,
        //         //     high: bar.high,
        //         //     open: bar.open,
        //         //     close: bar.close,
        //         //     volume: bar.volume,
        //         // }));
        //         // const bars: Bar[] = [...dummy];
        //         const bars: Bar[] = [{
        //             "time": 1719964800000,
        //             "low": 60320,
        //             "high": 60646,
        //             "open": 60497.99,
        //             "close": 60579.12,
        //             "volume": 659.8241299999248
        //         }];

        //         onResult(bars, { noData: bars.length === 0 });
        //         console.log('bars', bars, { noData: bars.length === 0 })
        //     } catch (error) {
        //         onErrorCallback(error);
        //     }
        // },
        resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) {
            const symbolInfo: LibrarySymbolInfo = {
                // name: symbolName,
                // ticker: symbolName,
                ticker: 'ETH/BTC',
                name: 'ETH/BTC',
                description: "Description",
                type: 'crypto',
                session: "24x7",
                exchange: '',
                listed_exchange: "",
                timezone: "Etc/UTC",
                format: "price",
                pricescale: 100,
                minmov: 1,
                has_intraday: false,
                has_weekly_and_monthly: false,
                supported_resolutions: configurationData.supported_resolutions as ResolutionString[],
                volume_precision: 8,
                data_status: "streaming",
            };
            setTimeout(
                () => {
                    // Return some simple symbol information for the TEST symbol
                    if (symbolName === 'ETH/BTC') {
                        onSymbolResolvedCallback(symbolInfo);
                        // onSymbolResolvedCallback({
                        //     "name": "ETH/BTC",
                        //     "timezone": "America/New_York",
                        //     "minmov": 1,
                        //     "minmov2": 0,
                        //     "pointvalue": 1,
                        //     "session": "24x7",
                        //     "has_intraday": false,
                        //     "visible_plots_set": "c",
                        //     "description": "ETH/BTC Symbol",
                        //     "type": "stock",
                        //     "supported_resolutions": [
                        //         "D"
                        //     ],
                        //     "pricescale": 100,
                        //     "ticker": "ETH/BTC",
                        //     "exchange": "ETH/BTC Exchange",
                        //     "has_daily": true,
                        //     "format": "price"
                        // });
                    } else {
                        // Ignore all other symbols
                        onResolveErrorCallback('unknown_symbol');
                    }
                },
                50
            );
        },

        getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
            try {
                const url = `https://api.taapi.io/candles?secret=${apiKey}&exchange=binance&symbol=${'ETH/BTC'}&interval=1d&period=300`;
                // const response = await fetch(url);
                // const data = await response.json();
                fetch(url)
                    .then(response => response.json())
                    .then(data => {

                        // For this piece of code only we will only return bars for the TEST symbol
                        if (symbolInfo.ticker === 'ETH/BTC') {
                            // We are constructing an array for `countBack` bars.
                            const bars = new Array(periodParams.countBack - 1);

                            // For constructing the bars we are starting from the `to` time minus 1 day, and working backwards until we have `countBack` bars.
                            const time = new Date(periodParams.to * 1000);
                            time.setUTCHours(0);
                            time.setUTCMinutes(0);
                            time.setUTCMilliseconds(0);
                            time.setUTCDate(time.getUTCDate() - 1);

                            for (let i = periodParams.countBack - 2; i > -1; i -= 1) {
                                bars[i] = {
                                    open: data[i].open,
                                    high: data[i].high,
                                    low: data[i].low,
                                    close: data[i].close,
                                    time: data[i].timestamp * 1000,
                                }

                                // Note that this simple "-1 day" logic only works because the TEST symbol has a 24x7 session.
                                // For a more complex session we would need to, for example, skip weekends.
                                time.setUTCDate(time.getUTCDate() - 1);
                            }

                            // const bars: Bar[] = data.map((bar: any) => ({
                            //     time: bar.timestamp * 1000,
                            //     low: bar.low,
                            //     high: bar.high,
                            //     open: bar.open,
                            //     close: bar.close,
                            //     volume: bar.volume,
                            // }));
                            console.log('bars', bars)
                            // Once all the bars (usually countBack is around 300 bars) the array of candles is returned to the library.
                            onHistoryCallback(bars);
                        } else {
                            // If no result, return an empty array and specify it to the library by changing the value of `noData` to true.
                            onHistoryCallback([], {
                                noData: true
                            });
                        }
                    })
                    .catch(error => {
                        // Handle any errors here
                        console.error('Error:', error);
                    });
            } catch (err) {
                onErrorCallback(err);
            }
        },
        subscribeBars,
        unsubscribeBars,
    };
};

export default TaapiDatafeedFunc;