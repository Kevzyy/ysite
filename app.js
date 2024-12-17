const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const express = require("express");
const app = express();
const db = require("quick.db");
const conf = require("./src/configs/config.json");
const settings = require("./src/configs/settings.json");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const session = require("express-session");
const mongoose = require("mongoose");
const url = require("url");
const Discord = require('discord.js');
const fs = require('fs');
const moment = require("moment");
moment.locale("tr");
const cooldown = new Map();
const bp = require("body-parser");
const fetch = require("node-fetch")
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir(`./komutlar/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log("Olamazz! Hiç komut dosyası bulamadım!")
	} else {
		if (err) {
			console.error("Hata! Bir komutun name veya aliases kısmı yok!")
		}
		console.log(`${jsfiles.length} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./komutlar/${f}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			console.log(`Yüklenen komut: ${props.help.name}`)
		})
	}
});
client.on('ready', () => {
 client.user.setActivity(`Takipçileri Selamlıyor 👋`)
});

client.on("message", async message => {

	if (message.author.bot) return
	if (!message.content.startsWith('!')) return
	var command = message.content.split(' ')[0].slice('!'.length)
	var args = message.content.split(' ').slice(1)
	var cmd = ''

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}

})
client.on("message", async (msg, member, guild) => {
   const codeData = require("./src/schemas/code");
  const code = await codeData.find({});
  if (msg.content.toLowerCase() === "!scriptler") {
     const embed = new Discord.MessageEmbed()
     .setThumbnail('https://cdn.discordapp.com/icons/1202929431744614410/49c34c59e5db56ccf7aa29291b80371b.webp')
   .addField('**Toplam Sitemizdeki Script Sayısı:**', ` \`\`\`${code.length}\`\`\``)
   .setColor("#7289da")
   msg.channel.send(embed)
    }
  });
client.on("message", async (msg, member, guild) => {
  const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');
   const codeData = require("./src/schemas/code");
  const code = await codeData.find({});
  
 
  var osType = await os.type();

        if (osType === 'Darwin') osType = 'macOS'
        else if (osType === 'Windows') osType = 'Windows'
        else osType = os.type();
 
    //--------------------------//
 
  
        const duration = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
     
     if (msg.content.toLowerCase() === "!bilgi") {
        const s = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.avatarURL())
        .addField("» **Botun Sahibi**", "<@1120422725559783424>")
        .addField("» **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms"
        .replace("{ping1}", new Date().getTime() - msg.createdTimestamp)
        .replace("{ping2}", client.ws.ping),true)
        .addField('» Çalışma süresi', `${duration}`, true)
        .addField('» Genel veriler', stripIndents`
        **Kullanıcı Sayısı:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
        **Sunucu Sayısı:** ${client.guilds.cache.size}
        **Kanal Sayısı:** ${client.channels.cache.size}
        `, true)
        .addField('» Versiyonlar', stripIndents`
        **Discord.JS sürümü** v${Discord.version}
        **NodeJS sürümü** ${process.version}
        `, true)
        .addField('» Kullanılan bellek boyutu', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .addField('» İşletim sistemi',  `${osType} 64 Bit`)
       
        .addField('» İşlemci', `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
        return msg.channel.send(s)
       
     }
})

   client.on("message", async (msg, member, guild) => {
   const codeData = require("./src/schemas/code");
  const code = await codeData.find({});
     const Discord = require("discord.js")

  if (msg.content.toLowerCase() === "!yardım") {
    let cse = new Discord.MessageEmbed()//discord.gg/turkiye
.setTitle(client.user.username+" Yardım Menüsü")
.setColor("BLUE")
.setThumbnail("https://cdn.discordapp.com/icons/1202929431744614410/49c34c59e5db56ccf7aa29291b80371b.webp")
.setDescription(`
**Hepinize merhaba dostlar. Bu Menü bot hakkında bilgiler verir.**

**!bilgi :** Bot İstatistiklerini Verir.
**!scriptler :** Script İstatistiklerini Verir.
**!site :** Script Sitemize Yönlendirir.

\`Not: Dostlar Siteye Giderek Tüm Scriptlere Ulaşabilirsiniz.\`
`)
.setFooter("Kevzyy tarafından yapılmıştır")
.setTimestamp()
msg.channel.send(cse)
  }
   })
client.on("message", msg => {
  if (msg.content.toLowerCase() === "!site") {
    msg.reply("**__Sitemiz__** : https://lumbermankevzyy.online || **__Youtube__** : https://www.youtube.com/@lumbermankevzyy!");
  }
});

// </> Middlewares </>
app.engine(".ejs", ejs.__express);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(__dirname + "/src/public"));
app.use(session({ secret: "secret-session-thing", resave: false, saveUninitialized: false, }));
app.use(passport.initialize());
app.use(passport.session());
// </> Middlewares </>

// </> Authorization </>
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

const scopes = ["identify", "guilds"];
passport.use(new Strategy({
      clientID: settings.clientID,
      clientSecret: settings.secret,
      callbackURL: settings.callbackURL,
      scope: scopes,
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    })
);

app.get("/login", passport.authenticate("discord", { scope: scopes, }));
app.get("/callback", passport.authenticate("discord", { failureRedirect: "/error", }), (req, res) => res.redirect("/"));
app.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});
// </> Authorization </>

// </> DB Connection </>
mongoose.connect(settings.mongoURL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
	console.log("Connected to DB");
});

mongoose.connection.on("error", () => {
	console.error("Connection Error!");
});
// </> DB Connection </>

// </> Pages </>
app.get("/", async (req, res) => {
  const guild = client.guilds.cache.get(conf.guildID);
  const owners = guild.members.cache.filter(x => x.roles.cache.has(conf.ownerRole));
  const admins = guild.members.cache.filter(x => x.roles.cache.has(conf.adminRole) && !owners.find(b => x.user.id == b));
  const codeSharers = guild.members.cache.filter(x => x.roles.cache.has(conf.codeSharer) && !owners.find(b => x.user.id == b) && !admins.find(b => x.user.id == b));
  res.render("index", {
    user: req.user,
    icon: guild.iconURL({ dynamic: true }),
    owners,
    admins,
    codeSharers,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/discord", (req, res) => 
  res.render("discord", {
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    conf
  })
);
app.get("/youtube", (req, res) => 
  res.render("youtube", {
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    conf
  })
);
const templateDir = path.resolve(`${process.cwd()}${path.sep}/src/`);
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
    bot: client,
    path: req.path,
    user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    };

 const checkAuth = (req, res, next) => {
      if (req.isAuthenticated()) return next();
      req.session.backURL = req.url;
      res.redirect("/login");
    }
    

app.get("/information", (req, res) =>
  res.render("info", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  })
);

app.get("/scriptbilgi", (req, res) =>
  res.render("uptime", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  })
);

app.get("/profile/:userID", async (req, res) => {
  const userID = req.params.userID;
  const guild = client.guilds.cache.get(conf.guildID);
  const member = guild.members.cache.get(userID);
  if (!member) return error(res, 501, "Böyle bir kullanıcı bulunmuyor!");
  const userData = require("./src/schemas/user");
  const codeData = require("./src/schemas/code");
  let data = await userData.findOne({ userID });
  const code = await codeData.find({});
  let auth;
  if (member.roles.cache.has(conf.ownerRole)) auth = "Owner";
  else if (member.roles.cache.has(conf.adminRole)) auth = "Admin";
  else if (member.roles.cache.has(conf.codeSharer)) auth = "Script Sharer";
  else if (member.roles.cache.has(conf.booster)) auth = "Booster";
  else auth = "Member";
  res.render("profile", {
    user: req.user,
    member,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    auth,
    color: member.displayHexColor,
    data: data ? data : {},
    code,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/admin", async (req, res) => {
  if (!req.user) return error(res, 138, "Bu sayfaya girmek için siteye giriş yapmalısın!");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = guild.members.cache.get(req.user.id);
  if (!member) return error(res, 138, "Bu sayfaya girmek için sunuzumuza katılmalısın!");
  if (!member.hasPermission(8)) return error(res, 401, "Bu sayfaya girmek için yetkin bulunmuyor!");
  const codeData = require("./src/schemas/code");
  const code = await codeData.find({}).sort({ date: -1 });
  res.render("admin", {
    user: req.user,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    code
  });
});

app.get("/bug/:codeID", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Bu sayfaya girmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  res.render("bug", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null,
    codeID: req.params.codeID
  });
});

app.get("/bug", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Bu sayfaya girmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  res.render("bug", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null,
  });
});

app.post("/bug", async (req, res) => {
  const guild = client.guilds.cache.get(conf.guildID);
  const member = req.user ? guild.members.cache.get(req.user.id) : null;
  if (!req.user || !member) return error(res, 138, "Bu sayfaya girmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const codeData = require("./src/schemas/code");
  console.log(req.body)
  const code = await codeData.findOne({ id: req.body.id });
  if (!code) return error(res, 404, req.body.id+" ID'li bir script bulunamadı!");
  
  if (!code.bug) {
    code.bug = req.body.bug;
    code.save();
  } else return error(res, 208, "Bu scriptte zaten bug bildirildi!")
  
  const channel = client.channels.cache.get(conf.bugLog);
  const embed = new MessageEmbed()
  .setAuthor(req.user.username, member.user.avatarURL({ dynamic: true }))
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setTitle("Bir Hata Bildirildi!")
  .setDescription(`
• Script adı: [${code.name}](https://${conf.domain}/${code.rank}/${req.body.id})
• Hata bildiren: ${guild.members.cache.get(req.user.id).toString()}
• Hata: ${req.body.bug}
  `)
  .setColor("RED")
  channel.send(embed);
  res.redirect(`/${code.rank}/${req.body.id}`);
});

app.get("/share", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Script paylaşabilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  res.render("shareCode", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    isStaff: client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id).roles.cache.has(conf.ownerRole),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/authorized", async (req, res) => {
  const guild = client.guilds.cache.get(conf.guildID);
  const owners = guild.members.cache.filter(x => x.roles.cache.has(conf.ownerRole));
  const admins = guild.members.cache.filter(x => x.roles.cache.has(conf.adminRole) && !owners.find(b => x.user.id == b));
  const codeSharers = guild.members.cache.filter(x => x.roles.cache.has(conf.codeSharer) && !owners.find(b => x.user.id == b) && !admins.find(b => x.user.id == b));
  res.render("yetkililer", {
    user: req.user,
    icon: guild.iconURL({ dynamic: true }),
    owners,
    admins,
    codeSharers,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});


app.post("/sharing", async (req, res) => {
  const guild = client.guilds.cache.get(conf.guildID);
  const member = req.user ? guild.members.cache.get(req.user.id) : null;
  if (!req.user || !member) return error(res, 138, "Script paylaşabilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const codeData = require("./src/schemas/code");
  const userData = require("./src/schemas/user");
  if (member && conf.notCodeSharer.some((x) => member.roles.cache.has(x) || member.user.id === x)) return error(res, 502, "Script paylaşma iznin bulunmuyor!");
  if (cooldown.get(req.user.id) && cooldown.get(req.user.id).count >= 3) return error(res, 429, "10 dakika içerisinde en fazla 3 script paylaşabilirsin!");
  const id = randomStr(8);
  
  let code = req.body;
  code.id = id;
  code.date = Date.now();
  if (!code.sharers) code.sharers = req.user.id;
  code.sharers = code.sharers.trim().split(" ").filter(x => guild.members.cache.get(x));
  if (code.sharers && !code.sharers.includes(req.user.id)) code.sharers.unshift(req.user.id);
  if (!code.modules) code.modules = "discord.js";
  if (!code.mainCode || code.mainCode && (code.mainCode.trim().toLowerCase() === "yok" || code.mainCode.trim() === "-")) code.mainCode = "";
  if (!code.command || code.command && (code.command.trim().toLowerCase() === "yok" || code.command.trim() === "-")) code.command = "";
  cooldown.get(req.user.id) ? cooldown.set(req.user.id, { count: cooldown.get(req.user.id).count += 1 }) : cooldown.set(req.user.id, { count: 1 });
  if (await cooldown.get(req.user.id).count === 1) setTimeout(() => cooldown.delete(req.user.id), 1000*60*10);
  
  code.sharers.map(async x => {
    const data = await userData.findOne({ userID: x });
    if (!data) {
      new userData({
        userID: x,
        codes: [code]
      }).save();
    } else {
      data.codes.push(code);
      data.save();
    }
  });
  
  let newCodeData = new codeData({
    name: code.name,
    id: code.id,
    sharers: code.sharers,
    desc: code.desc.trim(),
    modules: code.modules.trim(),
    mainCode: code.mainCode.trim(),
    command: code.command.trim(),
    rank: code.rank,
    date: code.date
  }).save();
  
  const channel = guild.channels.cache.get(conf.codeLog);
  let color;
  if (code.rank === "script") color = "#bfe1ff";
  else if (code.rank === "scriptplus") color = "#F1C531";
  else if (code.rank === "scriptplusplus") color = "#3998DB";
  else if (code.rank === "executor") color = "#f80000";
  else if (code.rank === "sizdengelenler") color = ""
  const embed = new MessageEmbed()
  .setAuthor(req.user.username, member.user.avatarURL({ dynamic: true }))
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setTitle(`**${code.rank}** kategorisinde bir script paylaşıldı!`)
  .setDescription(`
  • Script adı: [${code.name}](https://${conf.domain}/${code.rank}/${id})
  • Script Açıklaması: ${code.desc}
  • Scripti paylaşan: ${member.toString()}
  `)
  .setColor(color)
  channel.send(embed);
  res.redirect(`/${code.rank}/${id}`);
});

app.get("/script", async (req, res) => {
  const codeData = require("./src/schemas/code");
  const data = await codeData.find({ rank: "script" }).sort({ date: -1 });
  res.render("script", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data,
    moment,
    guild: client.guilds.cache.get(conf.guildID),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/scriptplus", async (req, res) => {
  const codeData = require("./src/schemas/code");
  const data = await codeData.find({ rank: "scriptplus" }).sort({ date: -1 });
  res.render("scriptplus", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data,
    moment,
    guild: client.guilds.cache.get(conf.guildID),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/scriptplusplus", async (req, res) => {
  const codeData = require("./src/schemas/code");
  const data = await codeData.find({ rank: "scriptplusplus" }).sort({ date: -1 });
  res.render("scriptplusplus", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data,
    moment,
    guild: client.guilds.cache.get(conf.guildID),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/executor", async (req, res) => {
  const codeData = require("./src/schemas/code");
  const data = await codeData.find({ rank: "executor" }).sort({ date: -1 });
  res.render("executor", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data,
    moment,
    guild: client.guilds.cache.get(conf.guildID),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/sizdengelenler", async (req, res) => {
  const codeData = require("./src/schemas/code");
  const data = await codeData.find({ rank: "sizdengelenler" }).sort({ date: -1 });
  res.render("sizdengelenler", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data,
    moment,
    guild: client.guilds.cache.get(conf.guildID),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/script/:codeID", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Scriptleri görebilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = req.user ? guild.members.cache.get(req.user.id) : null;
  if (member && !member.roles.cache.has(conf.booster) && !member.roles.cache.has(conf.ownerRole) && member.roles.cache.has(conf.adminRole)) return error(res, 501, "Bu scripti görebilmek için gerekli rolleriniz bulunmamaktadır! Lütfen bilgilendirme sayfasını okuyunuz!");
  const codeID = req.params.codeID;
  if (!codeID) return res.redirect("/");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ rank: "script", id: codeID });
  if (!code) return error(res, 404, codeID+" ID'li bir script bulunmuyor!");
  res.render("code", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data: code,
    guild,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/scriptplus/:codeID", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Scriptleri görebilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = req.user ? guild.members.cache.get(req.user.id) : null;
  const codeID = req.params.codeID;
  if (!codeID) return res.redirect("/");
  if (member && !member.roles.cache.has(conf.goldRole) && !member.roles.cache.has(conf.booster) && !member.roles.cache.has(conf.ownerRole) && member.roles.cache.has(conf.adminRole)) return error(res, 501, "Bu scripti görebilmek için gerekli rolleriniz bulunmamaktadır! Lütfen bilgilendirme sayfasını okuyunuz!");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ rank: "scriptplus", id: codeID });
  if (!code) return error(res, 404, codeID+" ID'li bir script bulunmuyor!");
  res.render("code", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data: code,
    guild,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/scriptplusplus/:codeID", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Scriptleri görebilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = req.user ? guild.members.cache.get(req.user.id) : null;
  const codeID = req.params.codeID;
  if (!codeID) return res.redirect("/");
  if (member && !member.roles.cache.has(conf.diaRole) && !member.roles.cache.has(conf.booster) && !member.roles.cache.has(conf.ownerRole) && member.roles.cache.has(conf.adminRole)) return error(res, 501, "Bu scripti görebilmek için gerekli rolleriniz bulunmamaktadır! Lütfen bilgilendirme sayfasını okuyunuz!");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ rank: "scriptplusplus", id: codeID });
  if (!code) return error(res, 404, codeID+" ID'li bir script bulunmuyor!");
  res.render("code", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data: code,
    guild,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/executor/:codeID", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Scriptleri görebilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = guild.members.cache.get(req.user.id);
  const codeID = req.params.codeID;
  if (!codeID) return res.redirect("/");
  if (member && !member.roles.cache.has(conf.readySystemsRole) && !member.roles.cache.has(conf.booster) && !member.roles.cache.has(conf.ownerRole) && member.roles.cache.has(conf.adminRole)) return error(res, 501, "Bu scripti görebilmek için gerekli rolleriniz bulunmamaktadır! Lütfen bilgilendirme sayfasını okuyunuz!");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ rank: "executor", id: codeID });
  if (!code) return error(res, 404, codeID+" ID'li bir script bulunmuyor!");
  res.render("code", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data: code,
    guild,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/sizdengelenler/:codeID", async (req, res) => {
  if (!req.user || !client.guilds.cache.get(conf.guildID).members.cache.has(req.user.id)) return error(res, 138, "Scriptleri görebilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const guild = client.guilds.cache.get(conf.guildID);
  const codeID = req.params.codeID;
  if (!codeID) return res.redirect("/");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ rank: "sizdengelenler", id: codeID });
  if (!code) return error(res, 404, codeID+" ID'li bir script bulunmuyor!");
  res.render("code", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    data: code,
    guild,
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.get("/delete/:rank/:id", async (req, res) => {
  if (!req.user) return error(res, 138, "Bu sayfaya girmek için siteye giriş yapmalısın!");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = guild.members.cache.get(req.user.id);
  if (!member) return error(res, 138, "Bu sayfaya girmek için sunuzumuza katılmalısın!");
  const codeData = require("./src/schemas/code");
  const userData = require("./src/schemas/user");
  const code = await codeData.findOne({ rank: req.params.rank, id: req.params.id });
  if (!code) return error(res, 404, req.params.id+" ID'li bir script bulunmuyor!");
  if (!member.hasPermission(8) || !code.sharers.includes(req.user.id)) return error(res, 401, "Bu sayfaya girmek için yetkin bulunmuyor!");
  
  
  const channel = client.channels.cache.get(conf.codeLog);
  const embed = new MessageEmbed()
  .setAuthor(req.user.username, member.user.avatarURL({ dynamic: true }))
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setTitle(`**${code.rank}** kategorisinde bir script silindi!`)
  .setDescription(`
• Script adı: ${code.name}
• Script Açıklaması: ${code.desc}
• Scripti paylaşan: ${guild.members.cache.get(code.sharers[0]) ? guild.members.cache.get(code.sharers[0]).toString() : client.users.fetch(code.sharers[0]).then(x => x.username)}
• Scripti silen: ${member.toString()}
  `)
  .setColor("RED")
  channel.send(embed);
  
  const data = await userData.findOne({ userID: req.user.id });
  if (data) {
    data.codes = data.codes.filter(x => x.id !== req.params.id);
    data.save();
  }
  
  code.deleteOne();
  res.redirect("/");
});

app.get("/edit/:rank/:id", async (req, res) => {
  if (!req.user) return error(res, 138, "Bu sayfaya girmek için siteye giriş yapmalısın!");
  const guild = client.guilds.cache.get(conf.guildID);
  const member = guild.members.cache.get(req.user.id);
  if (!member) return error(res, 138, "Bu sayfaya girmek için sunuzumuza katılmalısın!");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ rank: req.params.rank, id: req.params.id });
  if (!code) return error(res, 404, req.params.id+" ID'li bir script bulunmuyor!");
  if (!member.hasPermission(8) || !code.sharers.includes(req.user.id)) return error(res, 401, "Bu sayfaya girmek için yetkin bulunmuyor!");
  res.render("editCode", {
    user: req.user,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    isStaff: client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id).roles.cache.has("1318286435941355682"),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null,
    rank: req.params.rank,
    id: req.params.id
  });
});

app.post("/edit", async (req, res) => {
  const guild = client.guilds.cache.get(conf.guildID);
  const member = req.user ? guild.members.cache.get(req.user.id) : null;
  if (!req.user || !member) return error(res, 138, "Script paylaşabilmek için Discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir.");
  const codeData = require("./src/schemas/code");
  const code = await codeData.findOne({ id: req.body.id });
  console.log(code)
  if (!code) return error(res, 404, req.body.id+" ID'li bir script bulunmuyor!")
  
  let body = req.body;
  if (!body.name) body.name = code.name;
  if (!body.sharers) body.sharers = code.sharers;
  if (!body.desc) body.desc = code.desc;
  if (!body.modules) body.modules = code.modules;
  if (!body.mainCode) body.mainCode = code.mainCode;
  if (!body.rank) body.rank = code.rank;
  
  code.name = body.name;
  code.sharers = body.sharers;
  code.desc = body.desc
  code.modules = body.modules
  code.mainCode = body.mainCode
  code.rank = body.rank
  code.bug = null;
  code.save();
 
  const channel = client.channels.cache.get(conf.codeLog);
  const embed = new MessageEmbed()
  .setAuthor(req.user.username, member.user.avatarURL({ dynamic: true }))
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setTitle("Bir script düzenlendi!")
  .setDescription(`
  • Script adı: [${body.name}](https://${conf.domain}/${body.rank}/${body.id})
  • Script Açıklaması: ${body.desc}
  • Scripti paylaşan: ${member.toString()}
  `)
  .setColor("YELLOW");
  channel.send(embed);
  res.redirect(`/${body.rank}/${body.id}`);
});

app.post("/like", async (req, res) => {
  if (!req.user) return;
  const codeData = require("./src/schemas/code");
  const userData = require("./src/schemas/user");
  const code = await codeData.findOne({ id: req.body.id });
  if (code.sharers.includes(req.user.id)) return;
  if (code.likedUsers && code.likedUsers.includes(req.user.id)) return;
  if (req.body.durum === "true") {
  if (!code.likedUsers) {
    code.likedUsers = [req.user.id]
    code.save();
  } else {
    code.likedUsers.push(req.user.id)
    code.save();
  }
  code.sharers.map(async x => {
    const sharerData = await userData.findOne({ userID: x });
    sharerData.getLikeCount += 1;
    sharerData.save();
  });
  } else {
    if (code.likedUsers && !code.likedUsers.includes(req.user.id)) return;
    code.likedUsers = code.likedUsers.filter(x => x !== req.user.id);
    code.save();
    code.sharers.map(async x => {
      const sharerData = await userData.findOne({ userID: x });
      sharerData.getLikeCount -= 1;
      sharerData.save();
    });
  }
});

app.get("/error", (req, res) => {
  res.render("error", {
    user: req.user,
    statuscode: req.query.statuscode,
    message: req.query.message,
    icon: client.guilds.cache.get(conf.guildID).iconURL({ dynamic: true }),
    reqMember: req.user ? client.guilds.cache.get(conf.guildID).members.cache.get(req.user.id) : null
  });
});

app.use((req, res) => error(res, 404, "Sayfa bulunamadı!"));
// </> Pages </>


// </> Functions </>
const error = (res, statuscode, message) => {
  return res.redirect(url.format({ pathname: "/error", query: { statuscode, message }}));
};

const randomStr = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// </> Functions </>

app.listen(process.env.PORT || 80);
client.login(settings.token).catch((err) => console.log(err));

client.on("ready", () => {
  console.log("Site Hazır!");
});
