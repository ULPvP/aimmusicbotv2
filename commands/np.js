module.exports = {
	name: 'np',
	description: '正在執行指令',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('現在沒有在播放任何東西');
		return message.channel.send(`🎶 正在播放: **${serverQueue.songs[0].title}**`);
	}
};
