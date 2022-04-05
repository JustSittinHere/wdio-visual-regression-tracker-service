const baseConfig = require('./baseConfig').config;

exports.config = {
    ...baseConfig,
    services: [
        ...baseConfig.services,
        'chromedriver',
    ],
};
