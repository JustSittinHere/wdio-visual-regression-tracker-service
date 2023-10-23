declare global {
    export interface Global {
        browser: WebdriverIO.BrowserObject;
    }
}

declare namespace WebdriverIO {
    interface Browser {
        vrtTrackPage: (
            name: string,
            options?: {
                diffTolerancePercent?: number;
                os?: string;
                browser?: string;
                viewport?: string;
                device?: string;
                ignoreAreas?: [
                    {
                        x: number;
                        y: number;
                        width: number;
                        height: number;
                    },
                ];
                captureFullPage?: boolean;
            },
        ) => Promise<import('@visual-regression-tracker/sdk-js/dist/testRunResult').default>;
        vrtInstance: () => import('@visual-regression-tracker/sdk-js').VisualRegressionTracker;
    }
    interface Element {
        vrtTrackElement: (
            name: string,
            options?: {
                diffTolerancePercent?: number;
                os?: string;
                browser?: string;
                viewport?: string;
                device?: string;
                ignoreAreas?: [
                    {
                        x: number;
                        y: number;
                        width: number;
                        height: number;
                    },
                ];
            },
        ) => Promise<import('@visual-regression-tracker/sdk-js/dist/testRunResult').default>;
        vrtInstance: () => Promise<import('@visual-regression-tracker/sdk-js').VisualRegressionTracker>;
    }
}
