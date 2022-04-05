declare namespace WebdriverIO {
    interface Browser {
        async vrtTrackPage: (
            name: string,
            options?: {
                diffTolerancePercent?: number;
                os?: string;
                browser?: string;
                viewport?: string;
                device?: string;
            },
        ) => Promise<import('@visual-regression-tracker/sdk-js/dist/testRunResult').default>;
        vrtInstance: () => import('@visual-regression-tracker/sdk-js').VisualRegressionTracker;
    }
    interface Element {
        async vrtTrackElement: (
            name: string,
            options?: {
                diffTolerancePercent?: number;
                os?: string;
                browser?: string;
                viewport?: string;
                device?: string;
            },
        ) => Promise<import('@visual-regression-tracker/sdk-js/dist/testRunResult').default>;
        async vrtInstance: () => Promise<import('@visual-regression-tracker/sdk-js').VisualRegressionTracker>;
    }
}
