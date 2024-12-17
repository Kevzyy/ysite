const Discord = require('discord.js');

exports.run = async (client, message, args) => {

 const embed = new Discord.MessageEmbed()
    .setTitle(`Angel Code Sistem Botu`)
    .setDescription(`Merhaba **${message.author.username}**! \n\nBu Botu hem uptime hemde kod paylasım botu olarak tasarladık. \n siteye gitmek ve ya komutları gormek icin butonları kullanabilirsin.`)
    .setColor("RANDOM")
    .setImage("https://media.discordapp.net/attachments/907202627329220618/929332690262556692/information_menu.png")
    .setFooter(`Komutu Kullanan: ${message.author.tag} | Angel Code Kod Paylaşım`)

    // Label Buttons Music Commands
    const music = new Discord.MessageEmbed()
    .setTitle(":rotating_light: Bot Komutları!")
    .setDescription(`**Komutlar yakında hizmete geçecektir!**`)
    .setFooter(`Komutu Kullanan: ${message.author.tag} | Angel Code Kod Paylaşım`)

    

        const support = new Discord.MessageEmbed()
      .setURL('https://zone-id.my.id')


    let button1 = new MessageButton()
    .setLabel(`📖Music Commands`) // Show Label Button Music Commands
    .setID(`music`)
    .setStyle("blurple"); // Color Button

    let button2 = new MessageButton()
    .setStyle('url') // URL zone-id.my.id
    .setURL('https://deadpan-puzzling-wrench.glitch.me/')
    .setLabel('⚙️Sitemiz'); // Show Label Button Support Commmands

    let row = new MessageActionRow()
    .addComponents(button1, button2, button3, button4);   // Added Components for Button 1-4 , want add more please add , 5 or whtver u want



    const MESSAGE = await message.channel.send(embed, row);

    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 300000 });

    collector.on('collect', async (b) => {

        if(b.id == "music") { // Button Music Commands

            MESSAGE.edit(music, row);
            await b.reply.defer()
            
        }


          if(b.id == "support") { // Button Support Commands i mean ( Website www.zone-id.my.id )

            MESSAGE.edit(support, row);
            await b.reply.defer()
            
        }



    });
  
}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['ay', 'haelp', 'ha', 'bailgi', 'ianfo'],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	name: 'yardım',
	description: 'Sistem hakkında bilgi gösterir.',
	usage: 'yardım'
}