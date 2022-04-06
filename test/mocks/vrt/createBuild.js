/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:4200', { encodedQueryParams: true })
    .post('/builds', { branchName: 'master', project: 'Default project', ciBuildId: 'TestRun 1' })
    .reply(201, {
        id: '602398fe-61fc-4786-8131-16d62c5f5eca',
        ciBuildId: 'TestRun 1649156062054',
        number: 10,
        branchName: 'master',
        userId: null,
        status: 'new',
        projectId: 'e83c3238-baa1-40c5-a56b-bc30fd807e0e',
        updatedAt: '2022-04-05T10:54:22.119Z',
        createdAt: '2022-04-05T10:54:22.102Z',
        isRunning: true,
        passedCount: 0,
        unresolvedCount: 0,
        failedCount: 0,
        merge: false,
    })
    .persist();
