const { expect } = require('@playwright/test');
const { Env } = require('../constants/env');
const { testFixture } = require('../hooks/pageFixture');
const { WaitConfig } = require('../constants/wait');

class BasePage {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		this.page = page;
	}

	async goto(path = '') {
		await this.page.goto(`https://${Env[testFixture.env].baseURL}/${path}`);
	}
	async waitForTimeOut(timeout = WaitConfig.ExpectTimeout) {
		await this.page.waitForTimeout(timeout);
	}
	async getElement(locator) {
		return this.page.locator(locator);
	}
	async clickElement(locator) {
		await this.getElement(locator).then((element) => element.click());
	}
	async validateElementVisible(locator) {
		await expect(await this.getElement(locator)).toBeVisible({ timeout: WaitConfig.ExpectTimeout });
	}
	async inputValue(locator, value) {
		await this.getElement(locator).then((element) => element.fill(value));
	}
	async validatePageHaveURL(url, currentPage = this.page) {
		await expect(currentPage).toHaveURL(url);
	}
	async validateElementHaveText(locator, text) {
		await expect(await this.getElement(locator)).toHaveText(text);
	}
	async validateElementHaveAttributeWithValue(locator, attributeType, attributeValue) {
		await expect(await this.getElement(locator)).toHaveAttribute(attributeType, attributeValue);
	}
}

module.exports = BasePage;
