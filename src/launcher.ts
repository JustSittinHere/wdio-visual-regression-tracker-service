import { VisualRegressionTracker, Config, TestStatus, BuildResponse } from '@visual-regression-tracker/sdk-js';
import VrtOptions from './VrtOptions';

export default class WDIOSericeLauncher {
    private options;
    private caps;
    private config;
    private vrtCiName: string;
    private vrt: VisualRegressionTracker;

    constructor(serviceOptions: VrtOptions, caps: any[], config: any) {
        this.options = serviceOptions;
        this.caps = caps;
        this.config = config;
        this.vrtCiName = `Group ${Date.now().toString()}`;
    }

    async onPrepare(_config, _capabilities) {
        // create the run here with the ciBuildId to prevent race condition
        // in the worker thread attempting to create multiple runs with the same
        // name and getting a unique key violation
        
        this.vrt = new VisualRegressionTracker({...this.options, ciBuildId: this.vrtCiName});
        return this.vrt.start();
    }

    onWorkerStart(_cid, _caps, specs: string[], args: any, _execArgv) {
        // pass the ciBuildId into all worker threads to group the test runs together
        args.vrtCiName = this.vrtCiName;
    }

    async onComplete() {
        return this.vrt.stop();
    }
}
