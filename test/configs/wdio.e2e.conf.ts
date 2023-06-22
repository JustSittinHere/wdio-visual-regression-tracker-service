/* eslint-disable @typescript-eslint/no-var-requires */
import baseConfig from './baseConfig.js';

export const config = {
    ...baseConfig,
    services: [...baseConfig.services, 'chromedriver'],
};
