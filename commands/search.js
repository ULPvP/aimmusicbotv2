const search = require('youtube-search')
const { join } = require('discord.js')

module.exports = {
    name: 'search',
    description: '搜尋指令',
    usage: '[command name]',
    args: true,
    cooldown: 2,
    async excute(client, message, args, ops) {
        

        //搜尋videos with arguments
        search(args.join(" "), function(err, res);
               
        
            // 錯誤handling
        
            return message.channel.send('Sorry,發生一些錯誤!');
        
            //搜尋10個結果
            let videos = res.video.slice(0, 20); //可以增加/減少

            //loop them to create an Output String
            let resp = '';
            for(var i in videos) {
                resp += `**[${parseInt(i)+1}]:** \`$videos[i].title}\`\n`;
            }
            //加點指引
            resp += `\n**選擇數字 \`1-${videos.length}\``;

            //Send Output
            message.channel.send(resp);

            //Create a 訊息接收method
            const collector = message.channel.createMessageCollector(fitter);

            //更新接收器參數
            collector.videos = videos;
            collector.once('collect'), function(m) {
                // Run ``play conmmand,passing鏈接 as args[0]
                let commandFile = require(`./play.js`);
                commandFile.run(client, message, [this.video[parseInt(m.content)-1].url, ops]);
            };
        });
    }
}
  
