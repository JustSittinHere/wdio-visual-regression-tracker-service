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
            },
        ) => import('@visual-regression-tracker/sdk-js/dist/testRunResult').default;
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
            },
        ) => import('@visual-regression-tracker/sdk-js/dist/testRunResult').default;
        vrtInstance: () => import('@visual-regression-tracker/sdk-js').VisualRegressionTracker;
    }
}
