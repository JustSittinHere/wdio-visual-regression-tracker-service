/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:9515', { encodedQueryParams: true })
    .post((uri) => uri.endsWith('url'))
    .reply(200, { value: null })
    .persist();
