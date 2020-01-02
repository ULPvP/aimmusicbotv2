const search = require('yt-search')

exports.run = (client, message, args, ops) => {

  //搜尋videos with arguments
  search(args.join(' '), function(err, res) {
  // 錯誤handling
  if (err) return message.channel.send('Sorry,發生一些錯誤');
  
  //搜尋10個結果
  let videos = res.video.slice(0, 20); //可以增加/減少
  
  //loop them to create an Output String
  let resp = '';
  for(var i in videos) {
  
