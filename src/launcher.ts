import { VisualRegressionTracker } from '@visual-regression-tracker/sdk-js';
import VrtOptions from './VrtOptions';

export default class WDIOSericeLauncher {
    private options: VrtOptions;
    private vrtCiName: string;
    private vrt: VisualRegressionTracker;

    constructor(serviceOptions: VrtOptions) {
        this.options = serviceOptions;
        this.vrtCiName = this.options.ciBuildId || `TestRun ${Date.now().toString()}`;
    }

    async onPrepare() {
        // create the run here with the ciBuildId to prevent race condition
        // in the worker thread attempting to create multiple runs with the same
        // name and getting a unique key violation

        this.vrt = new VisualRegressionTracker({ ...this.options, ciBuildId: this.vrtCiName });
        return this.vrt.start();
    }

    onWorkerStart(_cid, _caps, _specs: string[], args: any) {
        // pass the user specified or auto generated ciBuildId
        // into all worker threads to group the test runs together
        args.vrtCiName = this.vrtCiName;
    }

    async onComplete() {
        return this.vrt.stop();
    }
}
