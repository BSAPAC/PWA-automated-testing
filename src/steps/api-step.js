const { Given, Then } = require('@cucumber/cucumber');
const APIContext = require('../api/api_context');
const { Env, LoginCredential } = require('../constants/env');
const { ApiPath } = require('../constants/api');
const Validation = require('../ultils/validation');
const { testFixture } = require('../hooks/pageFixture');

const header = {
	'Content-Type': 'application/json',
};

const casdoorBody = {
	application: 'milana',
	organization: 'milana',
	username: LoginCredential.SuperVisor.username,
	password: LoginCredential.SuperVisor.password,
	autoSignin: true,
	type: 'code',
};

const validation = new Validation();
let userResponse, saleOpportunitiesResponse;

Given('I Login to the application by API and get the token', async () => {
	const casdoorURL = `https://${Env.Casdoor}${ApiPath.prefix}${ApiPath.login}?clientId=f6f79118fa0fa4f4a73f&responseType=code&redirectUri=https%3A%2F%2Fdevweb.milana.tech%2Fcallback&type=code&scope=profile`;
	const casdoorAPI = new APIContext('POST', casdoorURL, header, casdoorBody);
	const casdoorRes = await casdoorAPI.sendRequest();
	const userData = await casdoorRes.json();
	const userToken = userData.data;
	const milanaURL = `https://${Env[testFixture.env].baseURL}${ApiPath.prefix}${
		ApiPath.signin
	}?code=${userToken}`;
	const milanaAPI = new APIContext('POST', milanaURL);
	const milanaRes = await milanaAPI.sendRequest();
	const milanaData = await milanaRes.json();
	global.AccessToken = milanaData.token;
});

Then('I use the token to get the user profile by API', async () => {
	const milanaURLUser = `https://${Env[testFixture.env].baseURL}${ApiPath.prefix}${ApiPath.users}`;
	const milanaAuthHeader = {
		Authorization: `Bearer ${global.AccessToken}`,
	};
	const milanaAPIUser = new APIContext('GET', milanaURLUser, milanaAuthHeader);
	const userRes = await milanaAPIUser.sendRequest();
	userResponse = userRes;
});

Given('I get the user profile by API without token', async () => {
	const milanaURLUser = `https://${Env[testFixture.env].baseURL}${ApiPath.prefix}${ApiPath.users}`;
	const milanaAPIUser = new APIContext('GET', milanaURLUser);
	const userRes = await milanaAPIUser.sendRequest();
	userResponse = userRes;
});

Then('I get the Sale Opportunities of current user by API', async () => {
	const milanaURLUser = `https://${Env[testFixture.env].baseURL}${ApiPath.prefix}${
		ApiPath.getSalesOpportunities
	}`;
	const milanaAuthHeader = {
		Authorization: `Bearer ${global.AccessToken}`,
	};
	const milanaAPISaleChance = new APIContext('GET', milanaURLUser, milanaAuthHeader);
	const saleChanceRes = await milanaAPISaleChance.sendRequest();
	saleOpportunitiesResponse = saleChanceRes;
});

Then(
	'the {string} API returns status code {int} with message {string}',
	async (apiRoute, statusCode, message) => {
		const cases = {
			'/users': () => {
				validation.validateAPIResponseCode(userResponse.status(), statusCode);
				validation.validateDataEqual(userResponse.statusText(), message);
			},
			'/getSalesOpportunities': () => {
				validation.validateAPIResponseCode(saleOpportunitiesResponse.status(), statusCode);
				validation.validateDataEqual(saleOpportunitiesResponse.statusText(), message);
			},
		};
		cases[apiRoute]();
	},
);

Then('the Users API returns data correct as in the database', async () => {
	const userResponseJson = await userResponse.json();
	validation.validateDataEqual(userResponseJson.email, LoginCredential.SuperVisor.username);
	validation.validateDataEqual(userResponseJson.displayName, 'Kalaanidhi maaran');
	validation.validateDataEqual(userResponseJson.name, 'Maaran');
});

Then('the Sale Opportunities API returns data correct as in the database', async () => {
	const saleChanceJson = await saleOpportunitiesResponse.json();
	validation.validateDataEqual(saleChanceJson.isValid, true);
	validation.validateDataEqual(saleChanceJson.opportunities.length, 3);
});
