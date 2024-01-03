const { emptyDirSync } = require('fs-extra');

try {
	emptyDirSync('./test-results');
	console.log('Empty directory ./test-results successfully!');
} catch (exception) {
	console.log(`Error while empty dir ./test-results: ${exception}`);
}
