const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////////////////////////////////Sunucu Kurma////////////////////////////////////////

client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(ayarlar.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
      );
    message.channel.send(
      `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
    );
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);

        message.guild
          .createChannel("「📃」kurallar", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「🚪」gelen-giden", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「✅」sayaç", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「💾」log-kanalı", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel("「📢」duyuru-odası", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
              )
            )
          );
      })
      .then(collected => {
        message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`「💡」şikayet-ve-öneri`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「👥」pre-arama-odası`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「📷」görsel-içerik`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「🤖」bot-komutları`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`「💬」sohbet`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
              )
            )
          );

        message.guild
          .createChannel(`🏆》Kurucu Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");

            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
          });

        message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`🏆》Yönetici Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "Kurucu");
            let role3 = message.guild.roles.find("name", "Yönetici");
            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
            c.overwritePermissions(role3, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`💬》Sohbet Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`🎮》LOL`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》ZULA`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》COUNTER STRİKE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》PUBG`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》FORTNİTE`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》MİNECRAFT`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》ROBLOX`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );
        message.guild
          .createChannel(`🎮》WOLFTEAM`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
              )
            )
          );

        message.guild.createRole({
          name: "Kurucu",
          color: "RED",
          permissions: ["ADMINISTRATOR"]
        });

        message.guild.createRole({
          name: "Yönetici",
          color: "BLUE",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.createRole({
          name: "Moderatör",
          color: "GREEN",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.createRole({
          name: "V.I.P",
          color: "00ffff"
        });

        message.guild.createRole({
          name: "Üye",
          color: "WHITE"
        });

        message.guild.createRole({
          name: "Bot",
          color: "ORANGE"
        });

        message.channel.send("Gerekli Odalar Kuruldu!");
      });
  }
});

///////////////////////////////////7/24 Hosting///////////////////////////////////////////

const express = require("express");
const http = require("http");
const app = express();

app.get("/", (request, response) => {
  //console.log(Date.now() + " BOT Aktif.");
  //response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_NAME}.glitch.me`);
}, 1000 * 60 * 3);

///////////////////////////////////GOLD ÜYE SİSTEMİ///////////////////////////////////////////

client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms = require("parse-ms");
  let timeout = 600000;
  let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
  let i = db.fetch(`gold_${msg.author.id}`);
  if (i == "gold") {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms(timeout - (Date.now() - dakdest));
    } else {
      if (msg.author.bot) return;
      if (msg.content.length > 1) {
        db.set(`goldzzz_${msg.author.id}`, Date.now());
        msg.channel.send("**Bir Gold Üye Belirdi!!**");
      }
    }
  } else if (i == undefined) {
  }
  if (!i) return;
});

//////////////////////////////////////////////////////////////////////////////

client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: ${member.user.tag}, aramızdan ayrıldı, \**${
        sayac[member.guild.id].sayi
      }\** kişi olmamıza \**${sayac[member.guild.id].sayi -
        member.guild.memberCount}\** kişi kaldı!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

///////////////////////////////////////////////////////////////////////

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `destek-aç`)) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists("name", "Destek Ekibi"))
      return message.channel.send(
        `Sunucu  \`Destek Ekibi\` rolüne sahip değil, bu yüzden yardım talebiniz oluşturulamıyor.`
      );
    if (message.guild.channels.exists("name", "destek-" + message.author.id))
      return message.channel.send(`Bir yardım talebine zaten sahipsin.`);
    if (
      !message.guild.channels
        .filter(c => c.type === "category")
        .find(c => c.name === "Destek")
    ) {
      let knl = message.guild.createChannel("Destek", "category").then(ds => {
        message.guild
          .createChannel(`destek-${message.author.id}`, "text")
          .then(c => {
            let role = message.guild.roles.find("name", "Destek Ekibi");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
            });
            message.channel.send(
              `:white_check_mark: Yardım talebiniz oluşturuldu, #${c.name}.`
            );
            const embed = new Discord.RichEmbed()
              .setColor(0xcf40fa)
              .addField(
                `Hey ${message.author.username}!`,
                `Yardım talebini neden açtığınızı açıkca anlatın. Destek ekibi en kısa zamanda cevap verecektir`
              )
              .setTimestamp();
            c.send({ embed: embed });
            c.setParent(ds);
          })
          .catch(console.error);
      });
    }
    let kanal = message.guild.channels
      .filter(c => c.type === "category")
      .find(c => c.name === "Destek");
    if (kanal) {
      message.guild
        .createChannel(`destek-${message.author.id}`, "text")
        .then(c => {
          let role = message.guild.roles.find("name", "Destek Ekibi");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          message.channel.send(
            `:white_check_mark: Yardım talebiniz oluşturuldu, #${c.name}.`
          );
          const embed = new Discord.RichEmbed()
            .setColor(0xcf40fa)
            .addField(
              `Hey ${message.author.username}!`,
              `Yardım talebini neden açtığınızı açıkca anlatın. Destek ekibi en kısa zamanda cevap verecektir`
            )
            .setTimestamp();
          c.send({ embed: embed });
          c.setParent(kanal);
        })
        .catch(console.error);
    }
  }

  if (message.content.toLowerCase().startsWith(prefix + `destek-kapat`)) {
    if (!message.channel.name.startsWith(`destek-`))
      return message.channel.send(
        `Yardım talebinizi yardım talebi kanalınızın dışındaki kanallarda kapatamazsınız.`
      );

    message.channel
      .send(
        `Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`-onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`
      )
      .then(m => {
        message.channel
          .awaitMessages(response => response.content === "-onayla", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit(
              "Kapatma talebinin zamanı geçti yardım talebin kapatılmadı."
            ).then(m2 => {
              m2.delete();
            }, 3000);
          });
      });
  }
});

///////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("GREEN")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: ${member.user.tag}, aramıza katıldı **${
        sayac[member.guild.id].sayi
      }** kişi olmamıza **${sayac[member.guild.id].sayi -
        member.guild.memberCount}** kişi kaldı!`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
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

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("Aleyküm selam,  hoş geldin ^^");
  }
});

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

////////////////////////////////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "heil") {
    msg.reply("**SIEG HEİL** https://www.dw.com/image/17080943_303.jpg");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "emirhan") {
    msg.reply("Kurucu Babamız");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "janqrox") {
    msg.reply("Kankam olur kendisi");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "kurucu geldi.") {
    msg.reply(
      "**Kurucu Babamız Piste İniş Yaptı.**                                                     https://thumbs.gfycat.com/GorgeousWideEyelashpitviper-size_restricted.gif"
    );
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "botdavet") {
    msg.reply(
      "**https://discord.com/oauth2/authorize?client_id=699547311310635080&scope=bot&permissions=8"
    );
  }
});

//////////////////////////////////////////////////////////

client.on("ready", () => {
  client.channels.get("807697472490045472").join();
  //main dosyaya atılacak
});

//////////////////////////////////////////////////////////

client.on("message", msg => {
  var dm = client.channels.get("807697471882395688"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});


//////////////////////////////////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "!!partner") {
    // İstediğiniz Komut
    msg.member.addRole("807697413149032539"); //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply("Partner Rolünü Başarıyla Aldın."); //Komutu Yazınca cevap ne yazsın?
  }
});

//////////////////////////////////////////////////////////

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);
