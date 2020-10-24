import logger from '@wdio/logger';
import IOptions from './IOptions';
import { VisualRegressionTracker, Config, TestStatus } from '@visual-regression-tracker/sdk-js';
import TestRunResult from '@visual-regression-tracker/sdk-js/dist/testRunResult';

export default class WDIOServiceService {
    private config: Config;
    private options: IOptions;
    private vrt: VisualRegressionTracker;
    private log: {
        info: (msg: string) => void;
        debug: (msg: string) => void;
        error: (msg: string) => void;
        warn: (msg: string) => void;
    };

    constructor(options: IOptions) {
        this.options = options;
        this.config = this.options;
        this.log = logger('visual-regression-tracker-service');
        this.log.info('Visual Regression Tracker Service Added');
        this.log.debug(`Using Visual Regression Tracker config ${this.config}`);
    }

    async before(): Promise<void> {
        this.log.debug('Connecting to Visual Regression Tracker');
        this.vrt = new VisualRegressionTracker(this.config);

        this.log.debug('Adding vrtSnapshotPage command to browser');

        browser.addCommand(
            'vrtSnapshotPage',
            async (
                name: string,
                options?: {
                    diffTolerancePercent?: number;
                    os?: string;
                    browser?: string;
                    viewport?: string;
                    device?: string;
                },
            ): Promise<TestRunResult> => {
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

        browser.addCommand(
            'vrtSnapshotElement',
            async (
                name: string,
                element: string | WebdriverIO.Element,
                options?: {
                    diffTolerancePercent?: number;
                    os?: string;
                    browser?: string;
                    viewport?: string;
                    device?: string;
                },
            ): Promise<TestRunResult> => {
                const elementToSnapshot: WebdriverIO.Element = typeof element === 'string' ? $(element) : element;

                if (!elementToSnapshot.isExisting()) {
                    throw new Error(`Unable to find element ${element} for snapshot test ${name}`);
                }

                var imageBase64 = await browser.takeElementScreenshot(elementToSnapshot.elementId);

                this.log.debug(`Uploading element snapshot for test ${name}`);

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
                        `Snapshot for element ${name} showed ${result.testRunResponse.pixelMisMatchCount} pixel mismatch count.\nView the result at ${result.testRunResponse.url}`,
                    );
                } else if (result.testRunResponse.status === TestStatus.new) {
                    this.log.warn(
                        `Snapshot for element ${name} has no baseline image set\nUpdate the baseline at ${result.testRunResponse.url}`,
                    );
                }

                this.log.debug(`Test for element ${name} returned with status ${result.testRunResponse.status}`);

                return result;
            },
        );

        browser.addCommand(
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
