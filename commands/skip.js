module.exports = {
	name: 'skip',
	description: '跳過指令',
	cooldown: 5,
	execute(message) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return message.channel.send('你需要在一個語音頻道去播放音樂!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('目前沒有在播放音樂🎵,所以沒辦法跳過音樂');
		serverQueue.connection.dispatcher.end('跳過指令已被使用');
	}
};
