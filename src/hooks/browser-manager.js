const { chromium, firefox, webkit, devices } = require('@playwright/test');

class BrowserManager {
	constructor(browserName) {
		this.browserName = browserName;
	}

	async initBrowser(broserOptions) {
		switch (this.browserName.toLowerCase()) {
			case 'chrome':
				return chromium.launch(broserOptions);
			case 'firefox':
				return firefox.launch(broserOptions);
			case 'webkit':
				return webkit.launch(broserOptions);
			default:
				throw new Error('Please input correct browser type!');
		}
	}

	initDevice(deviceName = 'Desktop Chrome') {
		return devices[deviceName];
	}
}

module.exports = BrowserManager;
