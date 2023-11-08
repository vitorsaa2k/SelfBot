const { Client } = require("discord.js-selfbot-v13");
const { MessageAttachment } = require("discord.js-selfbot-v13");
require("dotenv").config();
const { sendToDB } = require("./actions");
const embed = require("./embed");
const Captcha = require("2captcha");
const solver = new Captcha.Solver(process.env.API_KEY);
const client = new Client({
	checkUpdate: false,
	captchaService: "custom",
	captchaSolver: async (data, userAgent) => {
		console.log(await solver.hcaptcha(data.captcha_sitekey, "discord.com"));
		return await solver.hcaptcha(data.captcha_sitekey, "discord.com").data;
	},
});
const conviteEden = new MessageAttachment(
	"./Convite_Eden.png",
	"Convite_Eden.png"
);

client.on("ready", async () => {
	console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async msg => {
	if (msg.content === "m") {
		const guild = client.guilds.resolve(msg.guild.id);
		const members = await guild.members.fetch();
		const membersArray = Array.from(members);
		if (members.get(client.user.id)) members.delete(client.user.id);
		let botCounter = 0;
		let prevErrorCounter = 0;
		let errorCounter = 0;

		for (const member of membersArray) {
			await client.sleep(1000);
			if (errorCounter !== prevErrorCounter) {
				await client.sleep(500000);
				prevErrorCounter = errorCounter;
			}
			if (member[1].user.bot) {
				botCounter++;
				console.log(`Pulando o bot: ${member[1].user.username}`);
			} else if (member[1].user.id === client.user.id) {
				botCounter++;
			} else {
				member[1]
					.send({
						files: [conviteEden],
						content: "https://discord.gg/HjAEqXwupw",
					})
					.then(async e => {
						console.log(
							await sendToDB({
								username: member[1].user.username,
								id: member[1].user.id,
							})
						);
						console.log(`Mensagem enviada para: ${member[1].user.username}`);
					})
					.catch(async err => {
						console.log(err);
						console.log(
							`Falha no envio para: ${
								member[1].user.username
							} - Erro: ${JSON.stringify(err)}`
						);
						botCounter++;
						if (err.httpStatus === 403) {
							errorCounter++;
							console.log("Bot está sendo limitado, esperando 8 minutos");
						}
					});
				await client.sleep(10000);
			}
		}
		console.log(
			`messagem enviadas para todos no servidor: "${
				guild.name
			}" total de mensagens enviadas: ${membersArray.length - botCounter}`
		);
	}
});

client.login(process.env.TOKEN);
