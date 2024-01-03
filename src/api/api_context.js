const { request } = require('@playwright/test');

class APIContext {
	constructor(method, url, header, bodyRequest) {
		this.method = method;
		this.url = url;
		this.header = header;
		this.bodyRequest = bodyRequest;
	}

	async sendRequest() {
		const context = await request.newContext();
		let response;
		switch (this.method) {
			case 'GET':
				response = await context.get(this.url, { headers: this.header });
				break;
			case 'POST':
				response = await context.post(this.url, {
					headers: this.header,
					data: this.bodyRequest,
				});
				break;
			case 'PUT':
				response = await context.put(this.url, {
					headers: this.header,
					data: this.bodyRequest,
				});
				break;
			case 'DELETE':
				response = await context.delete(this.url, { headers: this.header });
				break;
			default:
				console.log('No requests');
				break;
		}
		return response;
	}
}

module.exports = APIContext;
