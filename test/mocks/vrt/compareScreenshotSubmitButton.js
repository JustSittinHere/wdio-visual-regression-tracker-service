const nock = require('nock');

nock('http://localhost:4200', { encodedQueryParams: true })
    .post('/test-runs', {
        buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
        projectId: 'e83c3238-baa1-40c5-a56b-bc30fd807e0e',
        branchName: 'master',
        name: 'LoginPage_SubmitButton',
        imageBase64:
            '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',
        diffTollerancePercent: 50,
    })
    .reply(
        201,
        {
            id: 'ba6e4150-1acb-4955-95c8-86c5592c60d7',
            buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
            imageName: '1649156700090.screenshot.png',
            diffName: null,
            diffPercent: 0,
            diffTollerancePercent: 50,
            status: 'ok',
            testVariationId: '67217948-4367-4c6f-91ba-0d4fc68302d6',
            name: 'LoginPage_SubmitButton',
            baselineName: '1649154994899.baseline.png',
            os: '',
            browser: '',
            viewport: '',
            device: '',
            customTags: '',
            ignoreAreas: '[]',
            tempIgnoreAreas: '[]',
            comment: null,
            branchName: 'master',
            baselineBranchName: 'master',
            merge: false,
            pixelMisMatchCount: 0,
            url: 'http://localhost:8080/e83c3238-baa1-40c5-a56b-bc30fd807e0e?buildId=602398fe-61fc-4786-8131-16d62c5f5eca&testId=ba6e4150-1acb-4955-95c8-86c5592c60d7',
        },
        [
            'X-Powered-By',
            'Express',
            'Access-Control-Allow-Origin',
            '*',
            'Content-Type',
            'application/json; charset=utf-8',
            'Content-Length',
            '708',
            'ETag',
            'W/"2c4-sMSLHegKoXKytxQ1yUW6q4cN+Bs"',
            'Date',
            'Tue, 05 Apr 2022 11:05:00 GMT',
            'Connection',
            'close',
        ],
    )
    .persist();
