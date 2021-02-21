// const LoginPage = require('../pageobjects/login.page');
import LoginPage from '../pageobjects/login.page';

describe('VRT Happy Path', () => {
    beforeAll(() => {
        LoginPage.open();
    });

    it('should take full page screenshots', () => {
        const result = browser.vrtTrackPage('loginPage', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });

    it('should take element screenshot', () => {
        const result = LoginPage.btnSubmit.vrtTrackElement('LoginPage_SubmitButton', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });
});
