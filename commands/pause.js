module.exports = {
	name: 'pause',
	description: '暫停指令.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ 已爲你停止了音樂');
		}
		return message.channel.send('現在沒有在播放任何東西');
	}
};
