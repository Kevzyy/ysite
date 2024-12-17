const Discord = require('discord.js');
const codeData = require("../src/schemas/code");
 
exports.run = async (client, message, args) => {
 const code = await codeData.find({});

   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`**Toplam Sitemizdeki Script Sayısı: `)
   .setColor("#7289da")
   message.channel.send(embed)
  
}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["sc"],
	permLevel: 0,
}

exports.help = {
	name: 'scriptler',
	description: 'Sistem hakkında bilgi gösterir.',
	usage: 'yardım'
}