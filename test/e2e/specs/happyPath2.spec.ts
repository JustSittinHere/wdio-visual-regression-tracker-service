import LoginPage from '../pageobjects/login.page';

describe('VRT Happy Path2', () => {
    beforeAll(() => {
        LoginPage.open();
    });

    it('should take full page screenshots2', () => {
        const result = browser.vrtTrackPage('loginPage2', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });

    it('should take element screenshot2', () => {
        const result = LoginPage.btnSubmit.vrtTrackElement('LoginPage_SubmitButton2', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });
});
