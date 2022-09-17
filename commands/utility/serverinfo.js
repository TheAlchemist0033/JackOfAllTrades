const Util = require('../../util/jacktill.js');

module.exports = {
  name: 'serverinfo',
  description: 'Displays infomation about the server',
  aliases: ['sinfo'],
  usage: '',
  cooldown: 2,
  args: 0,
  hidden:false,
  catergory: 'Utility',
  async execute(client, message, args) {
    const { EmbedBuilder } = require('discord.js');
    try {
      let sicon = message.guild.iconURL;
      const exembed = new EmbedBuilder()
      .setTitle("Server Info")
      .setColor("Random")
      .setFooter({text:`Requested by${message.author.username}`})
      .addFields(
            {name:"Name:",value:message.guild.name,inline:false},
            {name:"ID:",value:message.guild.id,inline:false},
            {name:"OwnerID:",value:message.guild.ownerId,inline:false},
            {name:"Members:",value:message.guild.memberCount.toString(),inline:false},
            {name:"Created:",value:`${message.guild.createdAt}`,inline:false}
      )
      .setTimestamp(new Date())
      return message.channel.send({
        embeds: [exembed]
      });
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  }
};
