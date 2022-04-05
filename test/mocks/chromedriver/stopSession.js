const nock = require('nock');

nock('http://localhost:9515', { encodedQueryParams: true })
    .delete('/session/cf1c85604d8b37389d0d482e8e0dff21')
    .reply(200, { value: null }, [
        'Content-Length',
        '14',
        'Content-Type',
        'application/json; charset=utf-8',
        'cache-control',
        'no-cache',
    ])
    .persist();
