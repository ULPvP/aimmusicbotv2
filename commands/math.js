module.exports = {
	name: 'math',
	description: '數學計算機',
	cooldown: 5,
	execute(client, message, args, tools) {

const math = require('mathjs');
const Discord = require('discord.js');



if (!args[0]) return message.channel.send('請打一個的算式');

let resp;
try {
  resp = math.eval(args.join(' '));
} catch (e) {
  return message.channel.send('請打一個正確的算式');
}
  const embed = new Discord.MessageEmbed()
  .setColor(0xffffff)
  .setTitle('數學計算功能')
  .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
  .addField('Output', `\`\`\`js\n${resp}\`\`\`\``)
  .setFooter('機器人製作By UL老熊#1188', 'https://yt3.ggpht.com/-An5r-xJGV50/AAAAAAAAAAI/AAAAAAAAAAA/I9rdWXpB5fU/s108-c-k-no-mo-rj-c0xffffff/photo.jpg');

message.channel.send(embed);
}
	
};
