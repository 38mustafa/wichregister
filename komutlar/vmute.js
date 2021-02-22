const Discord = require('discord.js');
const ms = require("ms");

exports.run = (client, message, args) => {
     if (!message.member.roles.find(r => r.name === "Voice Hammer",))
    return message.reply(`**Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin.**`);
    let kullanici = message.mentions.members.first()
    
    let süre = args[1]
    if (!süre) return message.reply("**Süre belirtmelisin.**")
    if (!kullanici) return message.channel.send("**Kimi susturacağını belirtmedin.**")
    kullanici.setMute(true, `**Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre}ms**`)
        .then(() =>
            message.channel.send(`**${kullanici} \`${süre}\` ses kanallarında susturuldu.**`))
        .catch(console.error);
        setTimeout(() => {

        kullanici.setMute(false,`**Süresi dolduğu için susturması kaldırıldı.**`)
        message.channel.send(`**${kullanici} Süresi dolduğu için mikrafonu açıldı.**`)

    }, ms(süre))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sustur'],
   permLevel: 0
};

exports.help = {
    name: 'sustur',
    description: 'sesli süreli sustur',
    usage: "sustur"
};