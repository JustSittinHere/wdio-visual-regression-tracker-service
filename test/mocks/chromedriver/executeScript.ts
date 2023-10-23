/* eslint-disable @typescript-eslint/no-var-requires */
import nock from 'nock';

const execSyncUriMatcher = (uri) => uri.endsWith('/execute/sync');

nock('http://localhost:9515', { encodedQueryParams: true })
    // .post('/session/e40f886c6a42f1c9310c67fc678b61b4/execute/sync', {"script":"return typeof html2canvas !== \"undefined\"","args":[]})
    .post(execSyncUriMatcher, { script: 'return typeof html2canvas !== "undefined"', args: [] })
    .reply(200, { value: false })
    .persist()

    // command to inject the script
    .post(execSyncUriMatcher, (body) => body.script && body.script.length > 1000)
    .reply(200, { value: null })
    .persist()

    // command to create the screenshot function
    .post(execSyncUriMatcher, (body) => body.script && body.script.includes('function genScreenshot'))
    .reply(200, { value: null })
    .persist()

    // command to check if image has been captured
    .post(execSyncUriMatcher, {
        script: 'return typeof canvasImgContentDecoded !== "undefined"',
        args: [],
    })
    .reply(200, { value: true })
    .persist()

    // return the screenshot
    .post(execSyncUriMatcher, { script: 'return canvasImgContentDecoded', args: [] })
    .reply(200, { value: 'data:image/png;base64,FakeBase64String' })
    .persist();
