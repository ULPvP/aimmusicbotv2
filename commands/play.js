const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');

module.exports = {
	name: 'play',
	description: '播放指令',
	usage: '[command name]',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const { voiceChannel } = message.member;
		if (!voiceChannel) return message.channel.send('你需要在一個語音頻道去播放音樂!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('我不能進入你的語音頻道,請確保我有足夠權限!');
		if (!permissions.has('SPEAK')) return message.channel.send('我不能再你的語音頻道播放音樂/説話,請確保我有足夠權限!');

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0]);
		const song = {
			id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(`✅ **${song.title}** 已被加到播放清單裏!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			songs: [],
			volume: 0.65,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.playOpusStream(await ytdlDiscord(song.url), { passes: 3 })
				.on('end', reason => {
					if (reason === 'Stream is not generating quickly enough.') console.log('音樂已結束');
					else console.log(reason);
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 開始播放 **${song.title}**`);
		};

		try {
			const connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`我不能加入你的語音頻道: ${error}`);
			message.client.queue.delete(message.guild.id);
			await voiceChannel.leave();
			return message.channel.send(`我不能加入你的語音頻道: ${error}`);
		}
	}
};
