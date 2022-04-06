/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:9515', { encodedQueryParams: true })
    .get('/session/cf1c85604d8b37389d0d482e8e0dff21/element/fc1cfcd6-6215-48c2-b1bf-899762e84f28/screenshot')
    .reply(200, {
        value: 'FakeBase64String',
    })
    .persist();
