import Page from './page';
import { BrowsingContextNavigateResult } from '../node_modules/webdriver/build/bidi/localTypes';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    inputUsername() {
        return $('#username');
    }
    inputPassword() {
        return $('#password');
    }
    btnSubmit() {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password): Promise<void> {
        await this.inputUsername().setValue(username);
        await this.inputPassword().setValue(password);
        await this.btnSubmit().click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open(): Promise<string | BrowsingContextNavigateResult> {
        return super.open('login');
    }
}

export default new LoginPage();
