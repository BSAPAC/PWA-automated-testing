const dayjs = require('dayjs');
const currentTime = dayjs();
const formattedTime = currentTime.format('YYYY-MM-DD_HH-mm-ss');

const commonConfig = {
	require: ['src/**/*.js'],
	formatOptions: {
		snippetInterface: 'async-await',
	},
	dryRun: false,
	format: [
		'./reporter/allure-config.js:allure-dummy.txt',
		['html', `test-results/cucumber-report-${formattedTime}.html`],
		['json', `test-results/cucumber-report-${formattedTime}.json`],
		['junit', `test-results/cucumber-report-${formattedTime}.xml`],
	],
	formatOptions: { colorsEnabled: true },
	parallel: 1,
	worldParameters: {
		browser: 'chrome',
		headless: true,
	},
};

const commonDevConfig = {
	...commonConfig,
	worldParameters: {
		...commonConfig.worldParameters,
		env: 'dev',
	},
};

const commonProdConfig = {
	...commonConfig,
	worldParameters: {
		...commonConfig.worldParameters,
		env: 'prod',
	},
};

/* Profiles config, use -p or --profile flag to use in CLI
 * We can avoid trashy in CLI when pass many args
 * Inherit from commonConfig, can override any config by pass the same key
 **/
module.exports = {
	default: {
		...commonDevConfig,
	},
	dev: {
		...commonDevConfig,
	},
	'dev:firefox': {
		...commonDevConfig,
		worldParameters: {
			...commonDevConfig.worldParameters,
			browser: 'firefox',
		},
	},
	'dev:iPhone14': {
		...commonDevConfig,
		worldParameters: {
			...commonDevConfig.worldParameters,
			device: 'iPhone 14',
		},
	},
	'dev:iPadPro11': {
		...commonDevConfig,
		worldParameters: {
			...commonDevConfig.worldParameters,
			device: 'iPad Pro 11',
		},
	},
	'dev:Pixel7': {
		...commonDevConfig,
		worldParameters: {
			...commonDevConfig.worldParameters,
			device: 'Pixel 7',
		},
	},
	'dev:GalaxyS9+': {
		...commonDevConfig,
		worldParameters: {
			...commonDevConfig.worldParameters,
			device: 'Galaxy S9+',
		},
	},
};
