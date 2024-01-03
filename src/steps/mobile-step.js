const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { remote } = require('webdriverio');

const capabilities = {
	platformName: 'Android',
	'appium:automationName': 'UiAutomator2',
	'appium:deviceName': 'Android',
	'appium:appPackage': 'vsanmart.ziac.com.vsanmart',
	'appium:appActivity': 'vsanmart.ziac.com.vsanmart.SplashScreen',
	'appium:udid': '397cf439',
};
const wdOpts = {
	hostname: 'localhost',
	port: 4723,
	logLevel: 'info',
	capabilities,
};

let driver;

Given('I open the Application', async () => {
	driver = await remote(wdOpts);
});
When('the application loaded', async () => {
	const loadingIcon = await driver.$('//*[@id="loading-icon"]');
	expect(await loadingIcon.isExisting()).toBeFalsy();
});
Then('I can see the login form', async () => {
	const txbUsername = await driver.$('//TextInputLayout[@text="User Name"]');
	const txbPassword = await driver.$('//TextInputLayout[@text="Password"]');
	expect(await txbUsername.isExisting()).toBeTruthy();
	expect(await txbPassword.isExisting()).toBeTruthy();
});
Then('I can see the register button', async () => {
	const btnRegister = await driver.$('//android.widget.Button[@text="REGISTER"]');
	expect(await btnRegister.isExisting()).toBeTruthy();
});
