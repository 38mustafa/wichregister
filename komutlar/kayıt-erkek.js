const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  
  
  
// 12. SATIRDA 2. ROL VAR
  
//------------------------------------KANALLAR-----------------------------------\\ STG
const tag = "Wich"; // TAGINIZ (BAŞA GELECEK) 
  
const kayıtlı = message.guild.roles.find(r => r.id === "809158365175087104"); // KADIN ROLÜNÜN İDSİ
  
// extra rol verme aktif etmek için hemen altaki ikinci & ucuncu adlı kısımdaki // işartetini kaldırın ve "51 52 56 57".ci satırdaki // işarterleri yine kaldırın.   
const ikinci = message.guild.roles.find(r => r.id === "809158366009884672");
//const ucuncu = message.guild.roles.find(r => r.id === "");    
  
const unregister = message.guild.roles.find(r => r.id === "809158366697488464"); // UNREGİSTER ROLÜNÜN İDSİ
  
//------------------------------------KANALLAR-----------------------------------\\ STG
  
  
  
  
  
  
//------------------------------------KANALLAR-----------------------------------\\ STG
  
  const log = message.guild.channels.find(c => c.id === "809158383629238322"); // KAYIT KANALININ İDSİ
  const genelchat = message.guild.channels.find(c => c.id === "809158395864154123"); // GENEL SOHBET KANALININ İDİSİ
  const yedekleme = message.guild.channels.find(c => c.id === "809158407675838485"); // KAYITLARI SİZE ÖZEL GÖSTERİR.
  if(!message.member.roles.some(r => ["809158338000060516","809158355595689994"].includes(r.id))) // ROL (KAYITÇI, VEYA Bİ ROL İDSİ) İDLERİ ÇOĞALTA BİLİRSİNİZ.
    return message.reply("Bu Komutu Kullanmak İçin Yeterli Yetkin Bulunmamakta !")
    
  
//------------------------------------KANALLAR-----------------------------------\\    STG
    
    
//------------------------------------------------ROL-VERME-----------------------------------------------\\     STG

    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const stg = message.guild.member(member)
    const nick = args[1];
      if(!nick) return message.channel.send("Bir isim girin.")
    stg.setNickname(`${tag} ${nick}`)
    stg.addRole(kayıtlı)
    stg.addRole(ikinci)
    //stg.addRole(ucuncu)
    stg.removeRole(unregister)
    stg.setNickname(`${tag} ${nick}`)
    stg.addRole(kayıtlı)
    stg.addRole(ikinci)
    //stg.addRole(ucuncu)
    stg.removeRole(unregister)
   
//------------------------------------------------ROL-VERME-----------------------------------------------\\    STG
    
    
    //------------------------------------------------KAYITLAR-----------------------------------------------\\    STG    
    
  db.add(`kayıtSayi.${message.author.id}`, 1)
  db.add(`erkekUye.${message.author.id}`, 1)
  
  let erkek = db.get(`erkekUye.${message.author.id}`);
   
  let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`);
    
//------------------------------------------------KAYITLAR-----------------------------------------------\\    STG     
    
    
    
//------------------------------------------------MESAJ-----------------------------------------------\\     STG
    
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`• <@${stg.user.id}> Adlı Kullanıcıya **<@&${kayıtlı.id}>** Rolleri Verildi. \n • Yeni İsmi: ${tag} ${nick} Olarak Güncellendi. `)
    .setFooter(`Toplam ${kayıtlar} Kayıtın Var.`)
    .setColor("0x2f3136")
    log.send(embed)
    
        const agla = new Discord.RichEmbed()
        genelchat.send(`<@${stg.user.id}> Aramıza Hoş Geldin, Keyifli Vakitler Geçirmeni Dileriz.`)      

    
    const embed2 = new Discord.RichEmbed()
        .setThumbnail(message.author.avatarURL)     
    .setTitle(`Awand Kayıt Logları`) 
    .setDescription(`• Kayıt Eden: <@${message.author.id}>
                     • Kayıt Edilen: <@${stg.user.id}>
                     • Verilen Roller: <@&${kayıtlı.id}>
                     • Yeni İsim: \`${tag} ${nick}\` 
                     • Kayıt Edilen Kanal: ${message.channel.name}
                     • Toplam Kayıtlar: ${kayıtlar}`)
    .setFooter(`Awand`)
    .setColor("0x2f3136")
    yedekleme.send(embed2)
    

//------------------------------------------------MESAJ-----------------------------------------------\\       STG

  
  
  
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e", "boy", "man"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: ""
};
   