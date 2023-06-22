/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import baseConfig from './baseConfig.js';
import { getAllFilesSync } from 'get-all-files';
import { fileURLToPath } from 'url';

const loadMocks = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    for (const filename of getAllFilesSync(path.join(__dirname, '..', 'mocks'))) {
        require(filename);
    }
};

loadMocks();

const config = {
    ...baseConfig,
    runner: 'local',
    protocol: 'http',
    hostname: 'localhost',
    port: 9515,
    beforeSession: () => {
        loadMocks();
    },
};

export default config;
