/* eslint-disable @typescript-eslint/no-var-requires */
import nock from 'nock';

nock('http://localhost:9515', { encodedQueryParams: true })
    .get('/session/cf1c85604d8b37389d0d482e8e0dff21/screenshot')
    .reply(200, {
        value: 'FakeBase64String',
    })
    .persist();
