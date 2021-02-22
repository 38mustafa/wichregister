const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//---------------------------------STRIGA ÇOK TATLI BİRİSİ BEN OLSAM VİDEOLARINA LİKE ATAR KANALINA ABONE OLUR VİDEOSUNA YORUM YAPARDIM BU ARADA---------------------------------\\





//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.addRole('809158366697488464'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG









//----------------------------------------------------HOŞ-GELDİN-MESAJI---------------------------------------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanal = "809158383629238322"; // HOŞGELİDNİ ATMASI GEREKEN KANALIN İDSİ
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();
  const embed = new Discord.RichEmbed()

  var kontrol;
if (kurulus < 1296000000) kontrol = '**Hesap Güvenilir Değil.**'
if (kurulus > 1296000000) kontrol = '**Hesap Güvenilir.**'
  moment.locale("tr");
  let log = client.channels.get(kanal);
log.send("Sunucumuza Hoşgeldin , " + member + " \n\nHesabını " + moment(member.user.createdAt).format("YYYY DD MMMM dddd hh:mm:ss") + " Önce Oluşturmuşsun. " + kontrol + "\n\nSunucmuzda Kurallarımızı Okumanı Tavsiye Ederiz Çünkü Herkes Kuralları Okundu Olarak Kabul Edilir Ve Ona Göre Ceza İşlemi Yapılır. \n\nSeninle Beraber " + member.guild.memberCount + " Kişiyiz, Tagımızı alarak ` Wich ` bize destek olabilirsin, Ses Odalarına Girerek <@&809158355595689994> Rolündekilere Teyit Verebilirsin. \n")
});

//----------------------------------------------------HOŞ-GELDİN-MESAJI---------------------------------------------------\\     STG




//-----------------------TAG-ROL----------------------\\     STG

client.on('userUpdate', async user => {
   let tag = "Wich"; // TAGINIZ
  let sunucuid = "809157638612975647"; //Buraya sunucunuzun IDsini yazın
  let rol = "809158357466087427"; //TAG ALINCA VERİLECEK ROL İDSİ
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == 'tag-log'); // TAG ALINCA HANGİ KANALA MESAJ ATILACAKSA YAZIN
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});

//-----------------------TAG-ROL----------------------\\     STG








//-----------------------TAG-KONTROL----------------------\\     STG

client.on("guildMemberAdd", member => {
let tag = "Wich"; // TAGINIZ
let sunucuid = "809157638612975647"; // SUNUCUİDSİ
let rol = "809158357466087427"; // TAG ALINCA VERİLECEK ROL İDSİ
let channel = client.guilds.get(sunucuid).channels.find(x => x.name == 'tag-log'); // TAG ALINCA HANGİ KANALA MESAJ ATILACAKSA YAZIN
if(member.user.username.includes("TAG")){ // TEKRAR TAGINIZI GİRİN
member.addRole("809158357466087427") // TEKRAR TAG ROLÜNÜN İDSİN GİRİN
  const tagalma = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi **Taglı Sunucumuza Katıldı !**, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     STG


/////////////////////SA-AS Komutu///////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.channel.send("Aleyküm Selam Hoşgeldin");
    
  }
});
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sea") {
    msg.channel.send("Aleyküm Selam Hoşgeldin");
  }
});
client.on("message", msg => {
  if (msg.content.toLowerCase() === "bb") {
    msg.channel.send("Görüşürüz Kardeşim");
  }
  if (msg.content === "Selamun Aleyküm") {
    msg.channel.send("ve aleyküm selam");
  }
  if (msg.content === "bye bye") {
    msg.channel.send("Su Gibi Git Su Gibi Gel");
  }
  if (msg.content === "günaydın") {
    msg.channel.send("Sana da Günaydın");
  }
  if (msg.content === "iyi geceler") {
    msg.channel.send("Sanada İyi Geceler");
  }
  if (msg.content === "iyi akşamlar") {
    msg.channel.send("Sanada İyi Akşamlar");
  }
  if (msg.content === "selamın aleyküm") {
    msg.channel.send("Ve Aleyküm Selam");
  }
  if (msg.content === "güle güle") {
    msg.channel.send("Sana Da Güle Güle");
  }
  if (msg.content === "Napim") {
    msg.channel.send("Birdaha Napim Dersen Seni İkiye Bölerim!!");
  }
});



/////////////////////SA-AS Komutu///////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "tag") {
    msg.channel.send("Wich");
  }
});
client.on("message", msg => {
  if (msg.content.toLowerCase() === "!tag") {
    msg.channel.send("Wich");
  }
});
client.on("message", msg => {
  if (msg.content.toLowerCase() === ".tag") {
    msg.channel.send("Wich");
  }
  if (msg.content === "Selamun Aleyküm") {
    msg.channel.send("Wich");
  }
  if (msg.content === "?tag") {
    msg.channel.send("Wich");
  }
  if (msg.content === "Tag") {
    msg.channel.send("Wich");
  }
  if (msg.content === "TaG") {
    msg.channel.send("Wich") 
  }
  if (msg.content === "tAG") {
    msg.channel.send("Wich");
  }
  if (msg.content === "TAg") {
    msg.channel.send("Wich");
  }
 
});

///////////////////BOTU ODAYA SOKMA///////////////////////////////////

client.on("ready", () => {
  client.channels.get("809158382560739338").join();
});
