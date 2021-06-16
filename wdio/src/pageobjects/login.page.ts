import Page from './page';

const expectchai = require('chai').expect;

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('#username');
  }

  get inputPassword() {
    return $('#password');
  }

  get btnSubmit() {
    return $('//button[@data-testid="login"]');
  }

  get successMsg() {
    return $('//div[@class="MuiAlert-message"]/h6');
  }

  get erroMsg() {
    return $('//div[@role="alert"]');
  }

  get btnBackToBI() {
    return $('//button/span[contains(text(),"Back to Bestinvest")]');
  }

  async login(username: string, password: string) {
    browser.waitUntil(async () => (await (await this.inputUsername).isDisplayed()) === true, {
      timeout: 10000,
      timeoutMsg: 'expected inputbox to be visible',
      interval: 2000,
    });
    await (await this.inputUsername).setValue(username);
    await (await this.inputPassword).setValue(password);
    browser.waitUntil(async () => (await (await this.btnSubmit).isEnabled()) === true, {
      timeout: 10000,
      timeoutMsg: 'expected submit button to be enabled',
      interval: 2000,
    });
    await (await this.btnSubmit).click();
  }

  async verifyMessage(type: string, message: string) {
    if (type === 'Success') {
      browser.waitUntil(async () => (await (await this.successMsg).isDisplayed()) === true, {
        timeout: 10000,
        timeoutMsg: 'Expected success message not found!',
        interval: 2000,
      });
      expectchai(await (await this.successMsg).getText()).to.equal(message);
    } else if (type === 'Blank') {
      browser.waitUntil(async () => (await (await this.erroMsg).isDisplayed()) === true, {
        timeout: 10000,
        timeoutMsg: 'Expected error message not found!',
        interval: 2000,
      });
      expectchai(await (await this.erroMsg).getText()).to.equal(message);
    } else {
      browser.waitUntil(async () => (await (await this.erroMsg).isDisplayed()) === true, {
        timeout: 10000,
        timeoutMsg: 'Expected error message not found!',
        interval: 2000,
      });
      expectchai(await (await this.erroMsg).getText()).to.equal(message);
    }
  }
}

export default new LoginPage();
