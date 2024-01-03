const BasePage = require('../base-page');

class LoginPage extends BasePage {
	constructor(page) {
		super(page);
	}
	element = {
		txbUsername: "//input[contains(@placeholder, 'username')]",
		txbPassword: "//input[contains(@placeholder, 'Password')]",
		signInBtn: "//span[text()='Sign In']",
		usernameValidatorTxt: '#normal_login_username_help',
		passwordValidatorTxt: '#normal_login_password_help',
	};

	async inputUsername(username) {
		await this.inputValue(this.element.txbUsername, username);
	}
	async inputPassword(password) {
		await this.inputValue(this.element.txbPassword, password);
	}
	async clickSignInButton() {
		await this.clickElement(this.element.signInBtn);
	}
	async validateLoginFormVisible() {
		await this.validateElementVisible(this.element.txbUsername);
		await this.validateElementVisible(this.element.txbPassword);
		await this.validateElementVisible(this.element.signInBtn);
	}
	async validateErrUsernameValidatorShow() {
		await this.validateElementVisible(this.element.usernameValidatorTxt);
		await this.validateElementHaveText(
			this.element.usernameValidatorTxt,
			'Please input your Email or Phone!',
		);
	}
	async validateErrPasswordValidatorShow() {
		await this.validateElementVisible(this.element.passwordValidatorTxt);
		await this.validateElementHaveText(
			this.element.passwordValidatorTxt,
			'Please input your password!',
		);
	}
}

module.exports = LoginPage;
