const BasePage = require('../base-page');

class DashboardPage extends BasePage {
	constructor(page) {
		super(page);
	}
	element = {
		horizonNav: (navType) => {
			return `//button[@role='tab' and text()='${navType}']`;
		},
	};

	async validateHorizonNavEnable(horizonNavType) {
		await this.validateElementHaveAttributeWithValue(
			this.element.horizonNav(horizonNavType),
			'aria-selected',
			'true',
		);
	}

	async validateShowDefaultDashboardView() {
		await this.validateHorizonNavEnable('Dashboard');
	}

	async clickButtonLogout() {
		await this.clickElement(this.element.logoutBtn);
	}
}

module.exports = DashboardPage;
