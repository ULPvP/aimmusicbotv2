module.exports = {
	name: 'queue',
	description: '播放清單.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**歌曲播放清單:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**正在播放:** ${serverQueue.songs[0].title}
		`);
	}
};
