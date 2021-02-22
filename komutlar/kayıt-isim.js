const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkilisi = '803721397960179762' //KAYIT YETKİLİSİNİN İDSİ
let isimönü = 'Wich' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN TAG

  if(!message.member.roles.has(kayityetkilisi)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))//////ꈎ`Ech#0006
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkilisi rolüne sahip olmasınız.`);//////ꈎ`Ech#0006
  let member = message.mentions.members.first()
  let isim = args.slice(1).join("")
  if (!member) return message.channel.send('Bir Üye Etiketlemelisin Dostum :)')
  if (!isim) return message.channel.send('Bir İsim Yazmalısın Dostum :)')

  setTimeout(function(){
  member.setNickname(`${isimönü} ${isim}`)//////ꈎ`Ech#0006
  },2000)

  
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`**İsimi Değiştirilen Kullanıcı :** ${member}  

`)
message.channel.send(embed)//////ꈎ`Ech#0006
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['isim','nick'],//////ꈎ`Ech#0006
  permLevel: 0
}
exports.help = {
  name: 'isim',
  description: "İsim Değiştirme Komutudur.",
  usage: '!isim <yeni nick>'
}