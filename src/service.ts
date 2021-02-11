import logger from '@wdio/logger';
import { VisualRegressionTracker, Config, TestStatus, BuildResponse } from '@visual-regression-tracker/sdk-js';
import TestRunResult from '@visual-regression-tracker/sdk-js/dist/testRunResult';
import VrtOptions from './VrtOptions';

export interface VrtTrackOptions {
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
}

export default class WDIOServiceService {
    private options: VrtOptions;
    private vrt: VisualRegressionTracker;
    private log: {
        info: (msg: string) => void;
        debug: (msg: string) => void;
        error: (msg: string) => void;
        warn: (msg: string) => void;
    };
    private browser: WebdriverIO.Browser;
    private vrtCiName: string;

    constructor(serviceOptions: VrtOptions, _caps, config: Partial<{ vrtCiName: string }>) {
        this.options = serviceOptions;
        this.log = logger('visual-regression-tracker-service');
        this.log.info('Visual Regression Tracker Service Added');
        this.log.debug(`Using Visual Regression Tracker config ${this.options as Config}`);
        this.vrtCiName = config.vrtCiName;
    }

    async before(_caps: unknown, _specs: string[], browser: WebdriverIO.Browser): Promise<BuildResponse> {
        this.browser = browser;
        this.log.debug('Connecting to Visual Regression Tracker');

        this.vrt = new VisualRegressionTracker({ ...this.options, ciBuildId: this.vrtCiName });

        this.log.debug('Adding vrtSnapshotPage command to browser');

        this.browser.addCommand(
            'vrtTrackPage',
            async (name: string, options?: VrtTrackOptions): Promise<TestRunResult> => {
                const imageBase64 = await browser.takeScreenshot();

                this.log.debug(`Uploading snapshot for test ${name}`);

                const result: TestRunResult = await this.vrt.track({
                    name,
                    imageBase64,
                    diffTollerancePercent: options?.diffTolerancePercent || this.options.diffTolerancePercent,
                    os: options?.os,
                    browser: options?.browser,
                    viewport: options?.viewport,
                    device: options?.device,
                });

                if (result.testRunResponse.status === TestStatus.unresolved) {
                    this.log.warn(
                        `Snapshot for ${name} showed ${result.testRunResponse.pixelMisMatchCount} pixel mismatch count.\nView the result at ${result.testRunResponse.url}`,
                    );
                } else if (result.testRunResponse.status === TestStatus.new) {
                    this.log.warn(
                        `Snapshot for ${name} has no baseline image set\nUpdate the baseline at ${result.testRunResponse.url}`,
                    );
                }

                this.log.debug(`Test ${name} returned with status ${result.testRunResponse.status}`);

                return result;
            },
        );

        this.browser.addCommand(
            'vrtTrackElement',
            async function (name: string, options?: VrtTrackOptions): Promise<TestRunResult> {
                const vrt = (browser as any).vrtInstance();
                if (!this.isExisting()) {
                    throw new Error(`Unable to find element ${this} for snapshot test ${name}`);
                }

                const imageBase64 = await browser.takeElementScreenshot(this.elementId);

                const result: TestRunResult = await vrt.track({
                    name,
                    imageBase64,
                    diffTollerancePercent: options?.diffTolerancePercent || this.options.diffTolerancePercent,
                    os: options?.os,
                    browser: options?.browser,
                    viewport: options?.viewport,
                    device: options?.device,
                    ignoreAreas: options?.ignoreAreas,
                });

                return result;
            },
            true,
        );

        this.browser.addCommand(
            'vrtInstance',
            (): VisualRegressionTracker => {
                return this.vrt;
            },
        );

        this.log.info('Starting Visual Regression Tracker');
        return this.vrt.start();
    }

    async after(): Promise<void> {
        this.log.info('Stopping Visual Regression Tracker');
        return this.vrt.stop();
    }
}
