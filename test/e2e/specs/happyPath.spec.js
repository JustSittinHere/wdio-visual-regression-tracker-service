const LoginPage = require('../pageobjects/login.page');

describe('VRT Happy Path', () => {
    beforeAll(() => {
        LoginPage.open();
    });

    it('should take full page screenshots', () => {
        const result = browser.vrtSnapshotPage('loginPage', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });

    it('should take element screenshots from selector', () => {
        const result = browser.vrtSnapshotElement('LoginPage_SubmitButton', 'button[type="submit"]', { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });

    it('should take element screenshots from elements', () => {
        const result = browser.vrtSnapshotElement('LoginPage_SubmitButton', LoginPage.btnSubmit, { diffTolerancePercent: 50 });
        expect(result.testRunResponse.status).toBe('ok');
    });
});
