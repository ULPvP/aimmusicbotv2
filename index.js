require('dotenv').config();
const { readdirSync } = require('fs');
const { join } = require('path');
const MusicClient = require('./struct/Client');
const { Collection } = require("discord.js");
const token = process.env.TOKEN
const prefix = process.env.DISCORD_PREFIX
const client = new MusicClient({ token, prefix});
const Discord = require("discord.js");
const bot = new Discord.Client();
const exampleEmbed = new Discord.RichEmbed()
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}


client.on('ready', () => {
client.user.setGame("創作者:UL老熊#1188|ulp!play");
})


client.on('message', message => {
if(message.content.startsWith(prefix + "help")) {
const exampleEmbed = new Discord.RichEmbed()
    .setColor('#ff8c00')
    .setAuthor('UL老熊')
    .setDescription('以下爲機器人指令')
    .addField('ulp!play 網址', '播放音樂（需利用網址)')
    .addField('ulp!search 歌名', '播放音樂(需利用歌名)')		
    .addField('ulp!nowp', '查看目前在播放的音樂')
    .addField('ulp!pause', '暫時停止播放音樂,但不會退出語音頻道')
    .addField('ulp!quene', '查看播放清單')
    .addField('ul[!resume', '恢復播放')
    .addField('ulp!skip', '跳過目前在播放的一首音樂')
    .addField('ulp!stop', '停止播放音樂,並退出語音頻道')
    .addField('ulp!volume 聲量', '調整播歌德聲量')
    .setFooter('機器人製作By 老熊Messter', 'https://yt3.ggpht.com/-An5r-xJGV50/AAAAAAAAAAI/AAAAAAAAAAA/I9rdWXpB5fU/s108-c-k-no-mo-rj-c0xffffff/photo.jpg');
		message.channel.send(exampleEmbed);
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('我不能執行你私訊我那個指令,請不要使用私訊!');
	if (command.args && !args.length) {
		let reply = `請打一個正確的指令, ${message.author}!`;
		if (command.usage) reply += `\n正確用法應該是: \`${prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
	}
	if (!client.cooldowns.has(command.name)) {
		client.cooldowns.set(command.name, new Collection());
	}
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`請等待 ${timeLeft.toFixed(1)} 或更多秒去執行  \`${command.name}\` 指令!`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error);
		message.reply('在執行該指令時發生錯誤');
	}
});

client.login(token);
