const { Given, When, Then } = require('@cucumber/cucumber');
const { Env } = require('../constants/env');
const DBContext = require('../database/db-context');
const Validation = require('../ultils/validation');
const { testFixture } = require('../hooks/pageFixture');

let connectionString, dbContext, data;
const validation = new Validation();

Given('I get the database config and generate connection string', () => {
	const dbUsername = Env.DB.username;
	const dbPassword = Env.DB.password;
	const dbHost = Env.DB.host;
	const dbName = Env[testFixture.env].DBName;
	const dbPort = Env.DB.port;

	dbContext = new DBContext(dbUsername, dbPassword, dbHost, dbPort, dbName);
	connectionString = dbContext.generateConnectionString();
});

When('I query the {string} table with query {string}', async (table, query) => {
	data = await dbContext.queryDB(table, JSON.parse(query));
});

Then('the data returns from Users table correct as my expect', () => {
	validation.validateDataEqual(data[0].email, 'pranav@gmail.com');
	validation.validateDataEqual(data[0].displayName, 'Pranav Tyagi');
	validation.validateDataEqual(data[0].gender, 'male');
	validation.validateDataEqual(data[0].age, 21);
});

Then('the data returns from Profiles table correct as my expect', () => {
	validation.validateDataEqual(data[0].userId, 'eb3e8bdb-0bf6-45c3-919c-d0c61c559b41');
	validation.validateDataEqual(data[0].personalInformation.nationality, 'American');
	validation.validateDataEqual(data[0].personalInformation.gender, 'male');
	validation.validateDataEqual(data[0].personalInformation.age, 33);
});

Then('the data get all Female Users returns from Profiles table correct as my expect', () => {
	validation.validateDataEqual(data.length, 3);
	validation.validateDataEqual(data[0].customQuestions.length, 2);
	validation.validateDataEqual(data[0].customQuestions[0].question, 'What is your favorite book?');
	validation.validateDataEqual(data[0].customQuestions[0].answer, 'To Kill a Mockingbird');
	validation.validateDataEqual(
		data[0].customQuestions[1].question,
		'What is your favorite travel destination?',
	);
	validation.validateDataEqual(data[0].customQuestions[1].answer, 'Paris');
});
