import page from '../pageobjects/page';
import login from '../pageobjects/login.page';

describe('Digital Hybrid > login', () => {
  it('validate success message with valid credentials', async () => {
    page.launchUrl('/myaccount/login');
    (await login.btnBackToBI).waitForExist();
    await login.login('22578896', '12345678');
    await login.verifyMessage('Success', 'Success');
  });

  it('validate error msg on login with blank username and password', async () => {
    page.launchUrl('/myaccount/login');
    (await login.btnBackToBI).waitForExist();
    await login.login(' ', ' ');
    await login.verifyMessage('Blank', 'Request failed with status code 400');
  });

  it('validate error msg on login with incorrect credentials', async () => {
    page.launchUrl('/myaccount/login');
    (await login.btnBackToBI).waitForExist();
    await login.login('111222', '12345');
    await login.verifyMessage('Incorrect', 'Request failed with status code 404');
  });
});

// wdio run ./wdio.conf.ts --baseUrl='https://www.bestinvest.co.uk' && allure generate --clean
// allure serve
// open (path: string) {
//         // return browser.url(`https://the-internet.herokuapp.com/${path}`)
//         return browser.url(`/${path}`);
// });

// yarn wdio run wdio.conf.ts cross-env baseUrl='http://https://stukstswstagingdh.azureedge.net/'
