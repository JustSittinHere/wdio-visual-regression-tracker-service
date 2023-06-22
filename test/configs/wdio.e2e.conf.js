/* eslint-disable @typescript-eslint/no-var-requires */
import baseConfig from './baseConfig.js';

const config = {
    ...baseConfig,
    services: [...baseConfig.services, 'chromedriver'],
};

export default config;
