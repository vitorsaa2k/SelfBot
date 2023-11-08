const axios = require("axios").default;

async function sendToDB(user) {
	return await axios
		.post("https://cards-vitorsaa2k.vercel.app/api/card/deliver", user)
		.then(res => res);
}

module.exports = { sendToDB };
