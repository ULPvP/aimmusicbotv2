module.exports = {
	name: 'volume',
	description: '聲量指令',
	cooldown: 3,
	execute(message, args) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return message.channel.send('你需要在一個語音頻道去播放音樂!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('目前沒有在播放音樂🎵');
		if (!args[0]) return message.channel.send(`目前聲量為: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`已爲你設聲量到 **${args[0]}**`);
	}
};
