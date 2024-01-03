const localConfig = require('../../test-local.env.json');

const Env = {
	Casdoor: process.env.CASDOOR || localConfig.Casdoor,
	dev: {
		baseURL: process.env.BASE_URL || localConfig.dev.baseURL,
		DBName: process.env.DB_NAME || localConfig.dev.DBName,
	},
	test: {
		baseURL: process.env.BASE_URL || localConfig.dev.baseURL,
		DBName: process.env.DB_NAME || localConfig.dev.DBName,
	},
	DB: {
		username: process.env.DB_USERNAME || localConfig.DB.username,
		password: process.env.DB_PASSWORD || localConfig.DB.password,
		host: process.env.DB_HOST || localConfig.DB.host,
		port: process.env.DB_PORT || localConfig.DB.port,
	},
};

const LoginCredential = {
	SuperVisor: {
		username: process.env.SUPER_VISOR_USERNAME || localConfig.Accounts.SuperVisor.username,
		password: process.env.SUPER_VISOR_PASSWORD || localConfig.Accounts.SuperVisor.password,
	},
	Employee: {
		username: process.env.EMPLOYEE_USERNAME || localConfig.Accounts.Employee.username,
		password: process.env.EMPLOYEE_PASSWORD || localConfig.Accounts.Employee.password,
	},
};

const DeviceType = {
	Mobile: 'Mobile',
	Desktop: 'Desktop',
};

module.exports = {
	DeviceType,
	Env,
	LoginCredential,
};
