module.exports = {
	name: 'resume',
	description: '恢復播放',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ 已爲你恢復播放音樂');
		}
		return message.channel.send('現在沒有在播放任何東西!');
	}
};
