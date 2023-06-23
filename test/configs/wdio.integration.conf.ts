import path from 'path';
import { baseConfig } from './baseConfig.ts';
import { getAllFilesSync } from 'get-all-files';
import { fileURLToPath } from 'url';

const loadMocks = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    for (const filename of getAllFilesSync(path.join(__dirname, '..', 'mocks'))) {
        import(filename);
    }
};

loadMocks();

export const config: WebdriverIO.Config = {
    ...baseConfig,
    runner: 'local',
    protocol: 'http',
    hostname: 'localhost',
    port: 9515,
    beforeSession: () => {
        loadMocks();
    },
};
