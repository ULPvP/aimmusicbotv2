const discord = require('discord.js');
const client = new discord.Client();

const search = require（'yt-search'）;
const opts = {
    maxResults: 25,
    key: process.env.YOUTUBE_API,
    type: 'video'
};

module.exports = {
	name: 'search',
	description: '搜尋指令',
	cooldown: 1,
	execute(bot, message, args, ops) {

    
 

 
    //我們將使用提供的參數查找歌曲
     search(args.join(' '), function (err, res) {
 
        //如果出現問題。
          if (err)return message.channel.send（“出了點問題”）；
 
        //我們將只列出10首歌曲。
        var videos = res.videos.slice（0，15）;
 
        //在這裡，我們將響應。
        var response ='';
 
        //瀏覽列表中的每首歌曲，並在消息中堅持使用。
        for (var i in videos) {
 
            //用ID格式化消息。我們執行i + 1以確保第一首歌曲中沒有0。
            // \ r \ n正在開始新行，並在行尾添加一個空格。
            響應+ =`** [$ {parseInt（i）+ 1}]：** $ {videos [i] .title} \ r \ n`;
 
        }
 
         response +="選擇1-$ {videos.length}之間的數字。"；
 
        //發送消息。
        message.channel.send(response);
 
        //設置過濾器，以檢查您是否在查詢列表中提供了介於0和指定數字之間的數字。
           const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

 
        //使用該過濾器創建一個消息接收器。
        const collection = message.channel.createMessageCollector（filter）;
 
        //將我們在此處找到的所有視頻插入接收器。
        collection.videos = videos；
 
        //如果發送的消息中的數字介於0和指定的數字之間，我們將調用play命令。
        collection.once('collect'，function(music){
 
            //下載播放命令。
            var commandFile = require('./ play.js');
 
            //播放射擊並開始播放歌曲或添加到列表。
            commandFile.run(bot, message, [this.videos[parseInt(music.content) -1].url], ops);
 
        });
 
    });
 
}
 
module.exports.help = {
    name："搜索"
    description："搜索歌曲"
}
