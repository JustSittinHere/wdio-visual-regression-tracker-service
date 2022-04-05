const nock = require('nock');

nock('http://localhost:9515', { encodedQueryParams: true })
    .post('/session', {
        capabilities: {
            alwaysMatch: {
                browserName: 'chrome',
                acceptInsecureCerts: true,
                'goog:chromeOptions': { args: ['window-size=1000,800', 'headless'] },
            },
            firstMatch: [{}],
        },
        desiredCapabilities: {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': { args: ['window-size=1000,800', 'headless'] },
        },
    })
    .reply(
        200,
        {
            value: {
                capabilities: {
                    acceptInsecureCerts: true,
                    browserName: 'chrome',
                    browserVersion: '100.0.4896.60',
                    chrome: {
                        chromedriverVersion:
                            '100.0.4896.60 (6a5d10861ce8de5fce22564658033b43cb7de047-refs/branch-heads/4896@{#875})',
                        userDataDir: '/tmp/.com.google.Chrome.Ai7Ary',
                    },
                    'goog:chromeOptions': { debuggerAddress: 'localhost:35953' },
                    networkConnectionEnabled: false,
                    pageLoadStrategy: 'normal',
                    platformName: 'linux',
                    proxy: {},
                    setWindowRect: true,
                    strictFileInteractability: false,
                    timeouts: { implicit: 0, pageLoad: 300000, script: 30000 },
                    unhandledPromptBehavior: 'dismiss and notify',
                    'webauthn:extension:credBlob': true,
                    'webauthn:extension:largeBlob': true,
                    'webauthn:virtualAuthenticators': true,
                },
                sessionId: 'cf1c85604d8b37389d0d482e8e0dff21',
            },
        },
    )
    .persist();
