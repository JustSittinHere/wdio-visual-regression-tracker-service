# WebdriverIO Visual Regression Tracker Service

[Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker) is an open source, self hosted solution for visual testing and managing results of visual testing.

This package is a plugin for [WebDriverIO](https://webdriver.io/) to allow for page and element snapshots to be uploaded and compared by Visual Regression Tracker using the [VRT SDK](https://github.com/Visual-Regression-Tracker/sdk-js)

## Features of Visual Regression Tracker

* Baseline images are uploaded to a central server so do not pollute your repo
* Separate baselines for each Project and Branch to help with versioning
* Ability to ignore regions on the baseline to omit from the compare.  Great for dealing with dynamic data
* Shareable links to results online without the need to send a results file
* Full baseline history so you can track application changes over time

## Async vs Sync Mode

As Sync mode in WebdriverIO has been deprecated, this package only supports Async mode.  It's possible this might work with existing Sync mode test suites, but I cannot guarantee this

## Installation

```bash
npm install wdio-visual-regression-tracker-service --save-dev
```

## Configuration

Update your `wdio.conf.js` file to add the service

```js
services: [
        [
            'visual-regression-tracker',
            {
                apiUrl: <string: URL for the Visual Regression Tracker API (Not the UI)>,
                branchName: <string: Branch Name to be used in VRT>,
                project: <string: Project Name to be used in VRT>,
                apiKey: <string: API Key from Visual Regression Tracker>,
                diffTolerancePercent: <number: Acceptable Pixel difference percentage>,
                enableSoftAssert: <boolean: should an exception be thrown when an image compare fails>,
            },
        ],
    ],
```

## Usage

The WDIO Browser object has been extended with new functions

### vrtTrackPage

Takes a screenshot of the entire page using browser.takeScreenshot and uploads it to VRT for comparison.  Returns the VRT test Results Object

```js
const result = await browser.vrtTrackPage('Test Name', {
    diffTolerancePercent?: number;
    os?: string;
    browser?: string;
    viewport?: string;
    device?: string;
    ignoreAreas?: [{
        x: number;
        y: number;
        width: number;
        height: number;
    }];
});
```

#### Full page screenshots including scrolling

**This is an experimental feature**

Currently, when taking a screenshot only FireFox will return you the entire page including scrolling.  This feature makes use of [HTML2Canvas](https://html2canvas.hertzen.com/) to capture the entire page, not just the visible area.  Taken from this [AutomateThePlanet Article](https://www.automatetheplanet.com/full-page-screenshots-webdriver-html2canvas/)

```js
const result = await browser.vrtTrackPage('Test Name', { captureFullPage: true });
```

### vrtTrackElement

Takes a snapshot of a specific element using browser.takeElementScreenshot and uploads it to VRT for comparison.  Returns the VRT test results object.

```js
const result = await (await $('.elementLocator')).vrtTrackElement('Test Name', {
    diffTolerancePercent?: number;
    os?: string;
    browser?: string;
    viewport?: string;
    device?: string;
    ignoreAreas?: [{
        x: number;
        y: number;
        width: number;
        height: number;
    }]});
);
```
### vrtInstance

Returns the raw VRT instance created by the VRT SDK on start.  Refer to [sdk-js docs](https://github.com/Visual-Regression-Tracker/sdk-js) for more info

```js
const vrt = await browser.vrtInstance();
const result = await vrt.track('imageName', 'imageBase64');
```

For more information on WebdriverIO see the [homepage](https://webdriver.io)
