const config = {
    specs: ['../specs/**/*.spec.ts'],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 5,
    capabilities: [
        {
            maxInstances: 5,
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                args: ['window-size=1000,800', 'headless'],
            },
        },
    ],
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'https://the-internet.herokuapp.com',
    waitForTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        [
            'visual-regression-tracker',
            {
                apiUrl: 'http://localhost:4200',
                branchName: 'master',
                project: 'Default project',
                apiKey: 'NZJ1G5YGPHM7XDHPX2FB7RP21GGN',
                diffTolerancePercent: 0,
                enableSoftAssert: false,
                ciBuildId: 'TestRun 1',
            },
        ],
    ],
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        defaultTimeoutInterval: 60000,
    },
};

export default config;
