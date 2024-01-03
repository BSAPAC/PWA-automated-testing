const { emptyDirSync } = require('fs-extra');

try {
	emptyDirSync('./allure-results');
	console.log('Empty directory ./allure-result successfully!');
} catch (exception) {
	console.log(`Error while empty dir ./allure-result: ${exception}`);
}
