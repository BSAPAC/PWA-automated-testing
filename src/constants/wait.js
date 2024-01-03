/**
 * Best practice: CucumberTimeout > PageTimeout > ExpectTimeout
 */

const WaitConfig = {
	CucumberTimeout: 2 * 60 * 1000,
	PageTimeout: 20 * 1000,
	ExpectTimeout: 20 * 1000,
};

module.exports = { WaitConfig };
