const mongoose = require("mongoose");
require('dotenv').config();


const config = {}
mongoose.set('strictQuery', false);



config.connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.dbUrl, {});
        console.log(
			`\x1b[36m%s\x1b[0m`,
			`DB: MongoDB Connected: ${conn.connection.host}`,
		);
	} catch (error) {
		console.log(
			`\x1b[31m%s\x1b[0m`,
			`DB: MongoDB Conn Failure: ${error.message}`,
		);
		process.exit(1);
	}
};
module.exports = config

