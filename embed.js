const Discord = require("discord.js-selfbot-v13");
// Selfhost WebEmbed: https://github.com/aiko-chan-ai/WebEmbed
const w = new Discord.WebEmbed({
	shorten: true,
	hidden: false, // if you send this embed with MessagePayload.options.embeds, it must set to false
})
	.setAuthor({ name: "Éden Roleplay", url: "https://discord.gg/HjAEqXwupw" })
	.setDescription(
		`Prepare-se para o VIP PRIME:

🚗 Golf GTI VIP: Estilo e potência nas suas mãos!
💰 Salário de $4,000 a cada 30 minutos: Dinheiro constante para gastar!
💰 Bônus Inicial de $70,000: Comece com uma bolada!
🏙️ Favelas de Graça: Construa seu império sem custos!
👮 Batalhão da Polícia Gratuito: Defenda a cidade sem pagar nada!
Vamos dominar essa cidade juntos! 🎮🚀`
	)
	.setTitle("🔥 Bora jogar junto de novo? consegui um vip pra gente 🔥")
	.setURL("https://discord.gg/HjAEqXwupw")
	.setThumbnail(
		"https://media.discordapp.net/attachments/1156916453900029952/1165012469064929330/Convite_Eden.png?ex=65454d69&is=6532d869&hm=4d7f6b251c8429a371ac02a28e4ff0aa26994aba49401f668caba8f51d5d239f&="
	);

module.exports = w;
