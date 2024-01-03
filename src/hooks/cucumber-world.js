const { setWorldConstructor } = require('@cucumber/cucumber');
const { CucumberAllureWorld } = require('allure-cucumberjs');

class CustomWorld extends CucumberAllureWorld {
	constructor(options) {
		super(options);
	}
	checkLinkedIWorld() {
		console.log('Init world...');
	}
}

setWorldConstructor(CustomWorld);
