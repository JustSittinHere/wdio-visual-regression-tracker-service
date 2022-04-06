/* eslint-disable @typescript-eslint/no-var-requires */
const nock = require('nock');

nock('http://localhost:9515', { encodedQueryParams: true })
    .post('/session/cf1c85604d8b37389d0d482e8e0dff21/element', {
        using: 'css selector',
        value: 'button[type="submit"]',
    })
    .reply(200, { value: { 'element-6066-11e4-a52e-4f735466cecf': 'fc1cfcd6-6215-48c2-b1bf-899762e84f28' } })
    .persist()

    .post('/session/cf1c85604d8b37389d0d482e8e0dff21/elements', {
        using: 'css selector',
        value: 'button[type="submit"]',
    })
    .reply(200, { value: [{ 'element-6066-11e4-a52e-4f735466cecf': 'fc1cfcd6-6215-48c2-b1bf-899762e84f28' }] })
    .persist();
