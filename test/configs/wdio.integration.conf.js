const path = require('path');

const baseConfig = require('./baseConfig').config;

const loadMocks = () => {
    const nock = require('nock');
    const getAllFiles = require('get-all-files');
    for (const filename of getAllFiles.getAllFilesSync(path.join(__dirname, '..', 'mocks'))) {
        require(filename);
    }
};

loadMocks();

exports.config = {
    ...baseConfig,
    runner: 'local',
    protocol: 'http',
    hostname: 'localhost',
    port: 9515,
    beforeSession: function (config, capabilities, specs) {
        loadMocks();
    },
};
