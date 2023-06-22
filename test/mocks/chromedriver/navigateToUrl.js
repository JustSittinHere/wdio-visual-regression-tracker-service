/* eslint-disable @typescript-eslint/no-var-requires */
import nock from 'nock';

nock('http://localhost:9515', { encodedQueryParams: true })
    .post((uri) => uri.endsWith('url'))
    .reply(200, { value: null })
    .persist();
