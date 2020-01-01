module.exports = {
	name: 'stop',
	description: '退出指令.',
	cooldown: 5,
	execute(message) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return message.channel.send('你需要在一個語音頻道去播放音樂!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('目前沒有在播放音樂🎵');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('已退出');
	}
};
