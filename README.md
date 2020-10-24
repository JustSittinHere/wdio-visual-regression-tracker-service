# WebdriverIO Visual Regression Tracker Service

[Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker) is an open source, self hosted solution for visual testing and managing results of visual testing.

This package is a plugin for [WebDriverIO](https://webdriver.io/) to allow for page and element snapshots to be uploaded and compared by Visual Regression Tracker using the [VRT SDK](https://github.com/Visual-Regression-Tracker/sdk-js)

## Features of Visual Regression Tracker

* Baseline images are uploaded to a central server so do not pollute your repo
* Separate baselines for each Project and Branch to help with versioning
* Ability to ignore regions on the baseline to omit from the compare.  Great for dealing with dynamic data
* Shareable links to results online without the need to send a results file
* Full baseline history so you can track application changes over time

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

### vrtSnapshotPage

Takes a screenshot of the entire page using browser.takeScreenshot and uploads it to VRT for comparison.  Returns the VRT test Results Object

```js
const result = browser.vrtSnapshotPage('Test Name', {
    diffTolerancePercent?: number;
    os?: string;
    browser?: string;
    viewport?: string;
    device?: string;}
);
```

### vrtSnapshotElement

Takes a snapshot of a specific element using browser.takeElementScreenshot and uploads it to VRT for comparision.  Returns the VRT test results object.

```js
const result = browser.vrtSnapshotElement('Test Name', '<SELECTOR or ELEMENT>', {
    diffTolerancePercent?: number;
    os?: string;
    browser?: string;
    viewport?: string;
    device?: string;}
);
```

```js
const resultBySelector = browser.vrtSnapshotElement('LoginButton', '#loginButton');
const resultByElement = browser.vrtSnapshotElement('LoginButton', $('#loginButton'));
```

### vrtInstance

Returns the raw VRT instance created by the VRT SDK on start.  Refer to [sdk-js docs](https://github.com/Visual-Regression-Tracker/sdk-js) for more info

```js
const vrt = browser.vrtInstance();
const result = vrt.track('imageName', 'imageBase64');
```

For more information on WebdriverIO see the [homepage](https://webdriver.io)
