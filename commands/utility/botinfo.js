const Util = require('../../util/jacktill.js');
const cpuStat = require("cpu-stat");
const os = require('os');
const utdb = require("../../utilities.js");
const { version } = require("discord.js");

module.exports = {
  name: 'botinfo',
  description: 'Displays infomation about the bot',
  aliases: ['binfo', 'bot', 'uptime'],
  usage: '',
  cooldown: 2,
  args: 0,
  hidden:false,
  catergory: 'Utility',
  async execute(client, message, args) {
    const { EmbedBuilder } = require('discord.js');
    try {
        let TotalCommands = "Invalid entry";
        await utdb.findOne({
            file:1
        }, (async (err, res) => {
            if (err) console.log(err);
            if (!res) {
            }else{
                TotalCommands = await res.comUsed;
            }})).clone()
     
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        let Uptime = Util.msToTime(client.uptime);
        const exembed = new EmbedBuilder()
        .setTitle("Bot Info")
        .setDescription("Lists all the bot information.")
        .setColor("Random")
        .setFooter({text:`Requested by ${message.author.tag}`,icon_url:message.author.displayAvatarURL})
        .addFields(
            {name:'• Mem Usage',value:`${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}/${(os.totalmem()/1024/1024).toFixed(2)} MB`,inline: true},
            {name:'• Uptime',value:`${Uptime}`,inline: true},
            {name:'• Users',value:`${client.users.cache.size}`,inline: true},
            {name:'• Servers',value:`${client.guilds.cache.size}`,inline: true},
            {name:"• Channels",value:`${client.channels.cache.size}`,inline: true},
            {name:'• Commands Used',value:`${TotalCommands}`,inline: true},
            {name:'• CPU',value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,inline:true},
            {name: '• CPU usage',value: `\`${percent.toFixed(2)}%\``,inline: true,},
            {name: '• Arch',value: `\`${os.arch()}\``,inline: true,},
            {name: '• Platform',value: `\`\`${os.platform()}\`\``,inline: true,},
            {name: '• Discord.js',value: `\`\`v${version}\`\``,inline: true,},
            {name: '• NPM version',value: `\`\`${process.version}\`\``,inline: true,},
            {name: '• Hosted In',value: `:flag_us: United States`,inline: true,}
        )
        .setTimestamp(new Date())
        return message.channel.send({embeds:[exembed]});
      })
    } catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  }

};
