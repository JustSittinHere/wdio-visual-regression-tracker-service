const nock = require('nock');

nock('http://localhost:9515', {"encodedQueryParams":true})
  .post('/session/cf1c85604d8b37389d0d482e8e0dff21/url', {"url":"https://the-internet.herokuapp.com/login"})
  .reply(200, {"value":null}, [
  'Content-Length',
  '14',
  'Content-Type',
  'application/json; charset=utf-8',
  'cache-control',
  'no-cache'
])
.persist();