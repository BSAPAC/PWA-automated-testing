const { MongoClient } = require('mongodb');

class DBContext {
	constructor(username, password, host, port, dbName) {
		this.username = username;
		this.password = password;
		this.host = host;
		this.port = port;
		this.dbName = dbName;
	}
	generateConnectionString() {
		return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/?authMechanism=DEFAULT&tls=true`;
	}

	/** Config:
	 * username
	 * password
	 * host
	 * dbName
	 */

	/** queryConfig
	 * collection;
	 * query;
	 */
	async queryDB(collection, query) {
		const client = new MongoClient(this.generateConnectionString());
		try {
			const db = client.db(this.dbName);
			const table = db.collection(collection);
			return await table.find(query).toArray();
		} catch (err) {
			console.log(`Error connect to MongoDB: ${err}`);
		} finally {
			await client.close();
		}
	}
}

module.exports = DBContext;
