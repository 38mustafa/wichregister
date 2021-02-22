const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async function(client, message, args) {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Bu komutu kullanabilmek için `Mesajları Yönet` iznine sahip olmalÄ±sÄ±n!')
  let abc = args.slice(0).join('')
  if(isNaN(abc)) return message.channel.send(`LÃ¼tfen silinecek mesaj miktarını yazın!  **Doğru Kullanım:** \`${prefix}temizle 1-300\``);
  if(!abc) return message.channel.send(`Lütfen silinecek mesaj miktarını yazın!  **Doğru Kullanım:** \`${prefix}temizle 1-300\``);

  if(abc > 1 && abc <= 100) {
    await(message.delete())
    message.channel.bulkDelete(abc).then(() => {
    message.channel.send(`** ${abc} Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:**`).then(msg => msg.delete(5000));
    })
  } else if(abc > 100 && abc <= 200) {
    await(message.delete())
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(abc-100).then(() => {
    message.channel.send(`** ${abc} Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:**`).then(msg => msg.delete(5000));
    })
  } else if(abc > 200 && abc <= 300) {
    await(message.delete())
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(100)
    message.channel.bulkDelete(abc-200).then(() => {
    message.channel.send(`** ${abc} Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:**`).then(msg => msg.delete(5000));
    })
    
    message.channel.send(`Lütfen 1-299 arasÄ± silinecek mesaj miktarı yazÄ±n **Doğru Kullanım:** \`${prefix}temizle 1-299\``);
  }

};
 
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['clear', 'sil' , 'temizle'], 
  permLevel: 0
};

exports.help = {
  name: 'sil', 
  description: 'Belirtilen miktarda mesajı siler.', 
  usage: 'sil <miktar>',
  kategori: 'yetkili'
};