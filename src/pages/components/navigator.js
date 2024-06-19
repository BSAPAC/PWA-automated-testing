const BasePage = require('../base-page');

class Navigator extends BasePage {
	constructor(page) {
		super(page);
	}

	element = {
		topHorizonNav: {
			hamburgerIcon: "[data-testid='ReorderIcon']",
			title: '.MuiBox-root h1',
		},
		bottomHorizonNav: {
			homeIcon: ".MuiBottomNavigation-root [data-testid='HomeIcon']",
			personIcon: ".MuiBottomNavigation-root [data-testid='PersonIcon']",
			notificationIcon: ".MuiBottomNavigation-root [data-testid='NotificationsActiveIcon']",
			settingIcon: ".MuiBottomNavigation-root [data-testid='SettingsIcon']",
		},
		rightMenu: {
			buttonLogout: `${this.getActiveRightMenu()}//div[*[local-name()='svg' and @data-testid='LogoutIcon']]`, //4 hidden elements
		},
	};

	getActiveRightMenu() {
		return "//div[contains(@class,'MuiDrawer-paper') and not(contains(@style, 'visibility: hidden'))]";
	}

	async clickHamburgerIcon() {
		await this.clickElement(this.element.topHorizonNav.hamburgerIcon);
	}

	async validateRightMenuShow() {
		await this.validateElementVisible(this.getActiveRightMenu());
	}

	async clickButtonLogout() {
		await this.clickElement(this.element.rightMenu.buttonLogout);
	}

	async clickBottomProfileNavigator() {
		await this.clickElement(this.element.bottomHorizonNav.personIcon);
	}

	async validatePageTitleIs(pageTitle) {
		await this.validateElementHaveText(this.element.topHorizonNav.title, pageTitle);
	}
}

module.exports = Navigator;
