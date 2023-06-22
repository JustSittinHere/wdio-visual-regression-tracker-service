/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import baseConfig from './baseConfig';
import nock from 'nock';

const appendLogToFile = (content) => fs.appendFileSync('record.txt', content);

nock.recorder.rec({
    logging: appendLogToFile,
});

const config = {
    ...baseConfig,
    services: [...baseConfig.services, 'chromedriver'],
};

export default exports;
