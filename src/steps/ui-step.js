const { Given, Then, When } = require('@cucumber/cucumber');
const { pageFixture, testFixture } = require('../hooks/pageFixture');
const BasePage = require('../pages/base-page');
const HomePage = require('../pages/modules/home-page');
const LoginPage = require('../pages/modules/login');
const DashboardPage = require('../pages/modules/dashboard');
const { Env, LoginCredential } = require('../constants/env');

Given('I navigate to the home page', async () => {
	const homePage = new HomePage(pageFixture.page);
	await homePage.goto();
});

When('I go to the Sign in page by click button Sign in on Home page', async () => {
	const homePage = new HomePage(pageFixture.page);
	await homePage.clickSignInBtn();
});

Then('I can see the Login Form on the Sign in Page', async () => {
	const loginPage = new LoginPage(pageFixture.page);
	await loginPage.validateLoginFormVisible();
});

Then('I click the Sign in button on the Sign in page', async () => {
	const loginPage = new LoginPage(pageFixture.page);
	await loginPage.clickSignInButton();
});

Then('I can see the Username and Password Error validation shown', async () => {
	const loginPage = new LoginPage(pageFixture.page);
	await loginPage.validateErrUsernameValidatorShow();
	await loginPage.validateErrPasswordValidatorShow();
});

Then('I login with a valid credential', async () => {
	const loginPage = new LoginPage(pageFixture.page);
	await loginPage.inputUsername(LoginCredential.SuperVisor.username);
	await loginPage.inputPassword(LoginCredential.SuperVisor.password);
	await loginPage.clickSignInButton();
});

Then('I can access the dashboard page to see the content', async () => {
	const dashboardPage = new DashboardPage(pageFixture.page);
	await dashboardPage.validateShowSaleOpportunity();
});

Then('I logout the application', async () => {
	const dashboardPage = new DashboardPage(pageFixture.page);
	await dashboardPage.clickButtonLogout();
});

Then('I am landing on the homepage', async () => {
	const homePage = new HomePage(pageFixture.page);
	await homePage.validatePageHaveURL(`https://${Env[testFixture.env].baseURL}`);
	await homePage.validateOnHomePage();
});
