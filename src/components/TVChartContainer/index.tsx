import { useRef, useEffect } from "react";

import { TAAPI_API_KEY } from "src/config-global";

import styles from "./index.module.css";
import TaapiDatafeedFunc from "./TaapiDatafeed";
import { widget, LanguageCode, ResolutionString, ChartingLibraryWidgetOptions } from "../../../public/static/charting_library";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
    const chartContainerRef =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const TaapiAPIKey = TAAPI_API_KEY || '';

    useEffect(() => {
        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: props?.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            // datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
            //     "https://demo_feed.tradingview.com",
            //     // `https://api.taapi.io/candles?secret=${TaapiAPIKey}&exchange=binance&symbol=BTC/USDT&interval=1h`,
            //     undefined,
            //     {
            //         maxResponseLength: 1000,
            //         expectedOrder: "latestFirst",
            //     }
            // ),
            datafeed: TaapiDatafeedFunc(TaapiAPIKey),
            interval: props?.interval as ResolutionString,
            container: chartContainerRef.current,
            library_path: props?.library_path,
            locale: props?.locale as LanguageCode,
            disabled_features: ["use_localstorage_for_settings", 'header_resolutions', 'create_volume_indicator_by_default'],
            enabled_features: [],
            charts_storage_url: props?.charts_storage_url,
            charts_storage_api_version: props?.charts_storage_api_version,
            client_id: props?.client_id,
            user_id: props?.user_id,
            fullscreen: props?.fullscreen,
            autosize: props?.autosize,
            theme: 'dark',
            timezone: 'Asia/Bangkok',
            overrides: {
                "paneProperties.background": "rgb(41, 36, 35)",
                "paneProperties.backgroundType": "solid",
            },

            custom_css_url: '/static/charting_library/custom.css',
            // debug: true,
        };

        // eslint-disable-next-line new-cap
        const tvWidget = new widget(widgetOptions);

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                tvWidget.chart().getSeries().setChartStyleProperties(1, {
                    upColor: 'orange',
                    downColor: 'cyan',
                    borderUpColor: 'orange',
                    borderDownColor: 'cyan',
                    wickUpColor: 'orange',
                    wickDownColor: 'cyan',
                });
                const button = tvWidget.createButton();
                button.setAttribute("title", "Click to show a notification popup");
                button.classList.add("apply-common-tooltip");
                button.addEventListener("click", () =>
                    tvWidget.showNoticeDialog({
                        title: "Notification",
                        body: "TradingView Charting Library API works correctly",
                        callback: () => {
                            console.log("Noticed!");
                        },
                    })
                );
                button.innerHTML = "Check API";
            });
        });

        return () => {
            tvWidget.remove();
        };
    }, [props, TaapiAPIKey]);

    return (
        <div ref={chartContainerRef} className={styles.TVChartContainer} />
    );
};
