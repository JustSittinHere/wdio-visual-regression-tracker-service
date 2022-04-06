/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:4200', { encodedQueryParams: true })
    .post('/test-runs', {
        buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
        projectId: 'e83c3238-baa1-40c5-a56b-bc30fd807e0e',
        branchName: 'master',
        name: 'LoginPage_SubmitButton',
        imageBase64: 'FakeBase64String',
        diffTollerancePercent: 50,
    })
    .reply(201, {
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
    })
    .persist();
