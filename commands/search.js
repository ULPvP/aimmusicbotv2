const discord = require('discord.js');
const client = new discord.Client();
const search = require('youtube-search');
const opts = {
    maxResults: 25,
    key: process.env.YOUTUBE_API,
    type: 'video'
};

module.exports = {
	name: 'search',
	description: '搜尋指令',
	cooldown: 1,
	execute(message) {

    if(message.content.toLowerCase() === 'Aim!search') {
        let embed = new discord.RichEmbed()
            .setColor("#73ffdc")
            .setDescription("請Aim!search 你要的歌名。記得最好打與歌曲最有效的關鍵字!")
            .setTitle("YouTube Search API");
        let embedMsg = await message.channel.send(embed);
        let filter = m => m.author.id === message.author.id;
        let query = await message.channel.awaitMessages(filter, { max: 1 });
        let results = await search(query.first().content, opts).catch(err => console.log(err));
        if(results) {
            let youtubeResults = results.results;
            let i  =0;
            let titles = youtubeResults.map(result => {
                i++;
                return i + ") " + result.title;
            });
            console.log(titles);
            message.channel.send({
                embed: {
                    title: '選出一個數字是你想要的歌曲',
                    description: titles.join("\n")
                }
            }).catch(err => console.log(err));
            
            filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
            let collected = await message.channel.awaitMessages(filter, { maxMatches: 1 });
            let selected = youtubeResults[collected.first().content - 1];

            embed = new discord.RichEmbed()
                .setTitle(`${selected.title}`)
                .setURL(`${selected.link}`)
                .setDescription(`${selected.description}`)
                .setThumbnail(`${selected.thumbnails.default.url}`);

            message.channel.send(embed);
        }
    }
});
