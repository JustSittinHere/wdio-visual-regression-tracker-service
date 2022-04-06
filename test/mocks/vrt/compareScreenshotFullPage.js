/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:4200', { encodedQueryParams: true })
    .post('/test-runs', {
        buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
        projectId: 'e83c3238-baa1-40c5-a56b-bc30fd807e0e',
        branchName: 'master',
        name: 'loginPage',
        imageBase64: 'FakeBase64String',
        diffTollerancePercent: 50,
    })
    .reply(201, {
        id: '82eb5e35-6476-4af6-b534-b18bb9feebfc',
        buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
        imageName: '1649156699729.screenshot.png',
        diffName: null,
        diffPercent: 0,
        diffTollerancePercent: 50,
        status: 'ok',
        testVariationId: '747a745a-c061-4771-a1c4-395ff5f23803',
        name: 'loginPage',
        baselineName: '1649087943696.baseline.png',
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
        url: 'http://localhost:8080/e83c3238-baa1-40c5-a56b-bc30fd807e0e?buildId=602398fe-61fc-4786-8131-16d62c5f5eca&testId=82eb5e35-6476-4af6-b534-b18bb9feebfc',
    })
    .persist()

    // with Scroll
    .post('/test-runs', {
        buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
        projectId: 'e83c3238-baa1-40c5-a56b-bc30fd807e0e',
        branchName: 'master',
        name: 'fullPageTest',
        imageBase64: 'FakeBase64String',
        diffTollerancePercent: 0,
    })
    .reply(201, {
        id: '9c92b4d8-5d9c-47c0-b3d8-b9e628f15234',
        buildId: '602398fe-61fc-4786-8131-16d62c5f5eca',
        imageName: '1649204626370.screenshot.png',
        diffName: null,
        diffPercent: 0,
        diffTollerancePercent: 0,
        status: 'ok',
        testVariationId: 'ed87691c-f50d-40a9-a2ba-2c7063d05f73',
        name: 'fullPageTest',
        baselineName: '1649204298879.baseline.png',
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
        url: 'http://localhost:8080/e83c3238-baa1-40c5-a56b-bc30fd807e0e?buildId=602398fe-61fc-4786-8131-16d62c5f5eca&testId=9c92b4d8-5d9c-47c0-b3d8-b9e628f15234',
    })
    .persist();
