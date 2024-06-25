import { useState } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

import {
    ResolutionString,
    ChartingLibraryWidgetOptions,
} from "../../../public/static/charting_library/charting_library";

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
    symbol: "AAPL",
    interval: "D" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
};

const TVChartContainer = dynamic(
    () =>
        import("src/components/TVChartContainer").then((mod) => mod.TVChartContainer),
    { ssr: false }
);

export default function DashBoardTradingChart() {
    const [isScriptReady, setIsScriptReady] = useState(false);
    return (
        <>
            <Script
                src="/static/datafeeds/udf/dist/bundle.js"
                strategy="lazyOnload"
                onReady={() => {
                    setIsScriptReady(true);
                }}
            />
            {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
        </>
    );
}