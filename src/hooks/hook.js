const { setDefaultTimeout, Before, After, Status, BeforeAll } = require('@cucumber/cucumber');
const { pageFixture, testFixture } = require('./pageFixture');
const BrowserManager = require('./browser-manager');
const fs = require('fs-extra');
const path = require('path');
const { upperCaseFistLowerCaseRest } = require('../ultils/string-helper');
const { DeviceType } = require('../constants/env');
const { WaitConfig } = require('../constants/wait');
let browserManager,
	browserOptions,
	browserContext,
	browser,
	context,
	page,
	testName,
	browserType,
	deviceType,
	deviceName;

setDefaultTimeout(WaitConfig.CucumberTimeout);

Before(function () {
	testFixture.env = this.parameters.env;
});

//Get global test configuration & pre-validation
Before({ tags: '@UI' }, async function () {
	browserType = this.parameters.browser ? this.parameters.browser : 'Chrome';
	deviceType = this.parameters.device ? DeviceType.Mobile : DeviceType.Desktop;
	deviceName = this.parameters.device ? this.parameters.device : DeviceType.Desktop;
});

// Example: --world-parameters '{"browser":"chrome","headless": true, "env": "dev"}'
// Viewport null &  args: ["--start-maximized"] make chrome maximize in Playwright
Before({ tags: '@UI' }, async function ({ pickle }) {
	browserOptions = {
		headless: this.parameters.headless,
	};
	browserContext = {
		acceptDownloads: true,
	};
	await this.parentSuite(
		`[UI Testing]: ${deviceName} | ${upperCaseFistLowerCaseRest(browserType)}`,
	);
	// await this.parameter('Testing Browser', upperCaseFistLowerCaseRest(browserType));
	if (deviceType == DeviceType.Mobile) {
		await this.parameter('Testing Device', `${deviceType} | ${this.parameters.device}`);
	} else if (deviceType == DeviceType.Desktop) {
		await this.parameter('Testing Device', deviceType);
		browserOptions = { ...browserOptions, args: ['--start-maximized'] };
	}
	testName = pickle.name.replace(/\W/g, '-');
	browserManager = new BrowserManager(browserType);

	browser = await browserManager.initBrowser(browserOptions);
	if (deviceType == DeviceType.Mobile) {
		browserContext = {
			...browserContext,
			...browserManager.initDevice(this.parameters.device),
			isMobile: true,
			recordVideo: {
				dir: `./test-results/records/record-${deviceName}-${testName}-${browserType}`,
			},
		};
	} else if (deviceType == DeviceType.Desktop) {
		const extraContext = {
			isMobile: false,
			viewport: null,
			recordVideo: {
				dir: `./test-results/records/record-${deviceName}-${testName}-${browserType}`,
			},
		};
		Object.assign(browserContext, extraContext);
	}
	context = await browser.newContext(browserContext);
	context.tracing.start({ screenshots: true, snapshots: true });
	page = await context.newPage();
	page.setDefaultTimeout(WaitConfig.PageTimeout);
	pageFixture.page = page;
});

Before({ tags: '@DB' }, async function () {
	await this.parentSuite(`[Database Testing]`);
});

Before({ tags: '@API' }, async function () {
	await this.parentSuite(`[API Testing]`);
});

Before({ tags: '@Mobile' }, async function () {
	await this.parentSuite(`[Mobile Testing]`);
});

After({ tags: '@UI' }, async function ({ result }) {
	if (result.status !== Status.PASSED) {
		image = await page.screenshot({
			fullPage: true,
			type: 'png',
		});
		this.attach(image, {
			fileName: `image-error-${deviceName}-${testName}-${browserType}.png`,
			mediaType: 'image/png',
		});
	}
	const traceDir = `./test-results/trace/trace-${deviceName}-${testName}-${browserType}.zip`;
	await context.tracing.stop({
		path: traceDir,
	});
	await page.close();
	await context.close();
	await browser.close();

	const traceBuffer = fs.readFileSync(traceDir);
	this.attach(traceBuffer, {
		fileName: `trace-${deviceName}-${testName}-${browserType}.zip`,
		mediaType: 'application/zip',
	});

	const videoBuffer = fs.readFileSync(
		`./test-results/records/record-${deviceName}-${testName}-${browserType}/${
			fs
				.readdirSync(`./test-results/records/record-${deviceName}-${testName}-${browserType}/`)
				.filter((file) => path.extname(file) === '.webm')[0]
		}`,
	);
	this.attach(videoBuffer, {
		fileName: `record-${deviceName}-${testName}-${browserType}.webm`,
		mediaType: 'video/webm',
	});
});

Before({ tags: '@skip' }, function () {
	return 'skipped';
});
