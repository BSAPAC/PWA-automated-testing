const BasePage = require('../base-page');

class HomePage extends BasePage {
	constructor(page) {
		super(page);
	}
	element = {
		loginBtn: "//button[text()='SIGN IN']",
		signupBtn: "//button[text()='SIGN UP Free']",
		btnAcceptCookie: "button[aria-label='Accept cookies']",
		cookieConsentBanner: "div.alert:has(button[aria-label='Accept cookies'])",
	};

	async clickSignInBtn() {
		await this.clickElement(this.element.loginBtn);
	}
	async clickSignUpBtn() {
		await this.clickElement(this.clickElement.signupBtn);
	}
	async validateOnHomePage() {
		await this.validateElementVisible(this.element.loginBtn);
		await this.validateElementVisible(this.element.signupBtn);
	}
	async validateCookieConsentShow() {
		await this.validateElementVisible(this.element.cookieConsentBanner);
	}
	async clickBtnAcceptCookie() {
		await this.clickElement(this.element.btnAcceptCookie);
	}
}

module.exports = HomePage;
