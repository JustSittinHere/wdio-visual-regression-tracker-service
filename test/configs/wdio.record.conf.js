/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const baseConfig = require('./baseConfig').config;
const nock = require('nock');

const appendLogToFile = (content) => fs.appendFileSync('record.txt', content);

nock.recorder.rec({
    logging: appendLogToFile,
});

exports.config = {
    ...baseConfig,
    services: [...baseConfig.services, 'chromedriver'],
};
