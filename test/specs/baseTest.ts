import LoginPage from '../pageobjects/login.page';

export default function () {
    beforeAll(() => {
        LoginPage.open();
    });

    it('should take full page screenshots', async () => {
        const result = await browser.vrtTrackPage('loginPage', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });

    it('should take element screenshot', async () => {
        const element = await LoginPage.btnSubmit()
        const result = await element.vrtTrackElement('LoginPage_SubmitButton', { diffTolerancePercent: 50 });
        
        expect(result.testRunResponse.status).toBe('ok');
    });
}
