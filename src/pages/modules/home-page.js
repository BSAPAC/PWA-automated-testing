const BasePage = require('../base-page');

class HomePage extends BasePage {
	constructor(page) {
		super(page);
	}
	element = {
		loginBtn: "//button[text()='Sign In']",
		signupBtn: "//button[text()='Sign Up']",
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
}

module.exports = HomePage;
