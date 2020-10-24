import IOptions from './IOptions';

export default class WDIOSericeLauncher {
    private options;
    private caps;
    private config;

    constructor(options: IOptions, caps: any[], config: any) {
        this.options = options;
        this.caps = caps;
        this.config = config;
    }
}
