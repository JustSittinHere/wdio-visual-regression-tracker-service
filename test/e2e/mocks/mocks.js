const nock = require('nock');

const scope = nock('http://localhost:4200')
  .post('/builds')
  .reply(201, {
    "id": "3595b454-05f7-4706-aa5a-737a7eec31f0",
    "number": null,
    "branchName": "master",
    "userId": null,
    "status": "new",
    "projectId": "23dc3ce7-3be7-429e-af66-62d2319d54d7",
    "updatedAt": "2020-10-22T17:57:00.565Z",
    "createdAt": "2020-10-22T17:57:00.564Z",
    "isRunning": true,
    "passedCount": 0,
    "unresolvedCount": 0,
    "failedCount": 0
  })
  .persist()

  .post('/test-runs', body => {
    const successTestNames = ['loginPage', 'LoginPage_SubmitButton'];
    return successTestNames.includes(body.name);
  })
  .reply(201, {
    "id": "db43e18c-874c-419a-b2bb-6c8e5f187d73",
    "imageName": "1603389422900.screenshot.png",
    "diffName": null,
    "diffPercent": 0,
    "diffTollerancePercent": 50,
    "pixelMisMatchCount": 0,
    "status": "ok",
    "merge": false,
    "url": "http://localhost:8080/23dc3ce7-3be7-429e-af66-62d2319d54d7?buildId=3595b454-05f7-4706-aa5a-737a7eec31f0&testId=db43e18c-874c-419a-b2bb-6c8e5f187d73"
  })
  .persist()

  .patch(uri => uri.includes('builds/'))
  .reply(200, {
    "id": "3595b454-05f7-4706-aa5a-737a7eec31f0",
    "number": null,
    "branchName": "master",
    "userId": null,
    "status": "passed",
    "projectId": "23dc3ce7-3be7-429e-af66-62d2319d54d7",
    "updatedAt": "2020-10-22T17:57:05.816Z",
    "createdAt": "2020-10-22T17:57:00.564Z",
    "isRunning": false,
    "passedCount": 3,
    "unresolvedCount": 0,
    "failedCount": 0
  })
  .persist();
