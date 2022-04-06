import { TestStatus } from '@visual-regression-tracker/sdk-js';

describe('full page screenshot', () => {
    it('should work', async () => {
        await browser.url('/');
        const result = await browser.vrtTrackPage('fullPageTest', { captureFullPage: true });

        expect(result.testRunResponse.status).toBe(TestStatus.ok);
    });
});
