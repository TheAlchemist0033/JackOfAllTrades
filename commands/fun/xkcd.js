const Util = require('../../util/jacktill.js');
const Discord = require("discord.js");
const request = require('node-superfetch');

module.exports = {
    name: 'xkcd',
    description: "Returns a random xkcd comic",
    aliases: [],
    usage: '',
    cooldown: 2,
    args: 0,
    catergory: 'Fun',
    async execute(client, message, args) {
        const { EmbedBuilder, DiscordjsErrorMixin } = require('discord.js');
        try {
            const current = await request.get('https://xkcd.com/info.0.json');
            const random = Math.floor(Math.random() * current.body.num) + 1;
            const { body } = await request.get(`https://xkcd.com/${random}/info.0.json`);
            tembed = new Discord.EmbedBuilder()
            .setTitle("XKCD Comic")
            .setImage(body.img)
            .setColor("Random")
            .setFooter({text:`Requested by ${message.author.tag}`,icon_url:message.author.displayAvatarURL})
            .setTimestamp(new Date())
            message.channel.send({embeds:[tembed]});
        } catch (err) {
            console.log(err);
            return message.reply(`Oh no, an error occurred. Try again later!`);
        }
    }
};
