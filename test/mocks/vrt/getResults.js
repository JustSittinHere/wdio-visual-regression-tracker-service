/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:4200', { encodedQueryParams: true })
    .patch('/builds/602398fe-61fc-4786-8131-16d62c5f5eca', {})
    .reply(200, {
        id: '602398fe-61fc-4786-8131-16d62c5f5eca',
        ciBuildId: 'TestRun 1',
        number: 11,
        branchName: 'master',
        userId: null,
        status: 'passed',
        projectId: 'e83c3238-baa1-40c5-a56b-bc30fd807e0e',
        updatedAt: '2022-04-05T11:05:00.172Z',
        createdAt: '2022-04-05T11:00:26.853Z',
        isRunning: false,
        passedCount: 2,
        unresolvedCount: 0,
        failedCount: 0,
        merge: false,
    })
    .persist();
