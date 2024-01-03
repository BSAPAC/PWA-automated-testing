const BasePage = require('../base-page');

class DashboardPage extends BasePage {
	constructor(page) {
		super(page);
	}
	element = {
		leftMenuSaleOpportunity: "//span[text()='Sales Oppurtunity']",
		logoutBtn: "//span[text()='Logout']",
	};

	async validateShowSaleOpportunity() {
		await this.validateElementVisible(this.element.leftMenuSaleOpportunity);
	}
	async clickButtonLogout() {
		await this.clickElement(this.element.logoutBtn);
	}
}

module.exports = DashboardPage;
