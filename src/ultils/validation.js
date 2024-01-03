const { expect } = require('@playwright/test');

class Validation {
	validateAPIResponseCode(actualResCode, expectResCode) {
		expect(actualResCode).toEqual(expectResCode);
	}
	validateDataEqual(actualData, expectData) {
		expect(actualData).toEqual(expectData);
	}
}

module.exports = Validation;
