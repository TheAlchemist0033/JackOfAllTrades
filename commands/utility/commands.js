module.exports = {
    name: 'commands',
    description: 'Returns the total commands the bot has.',
    aliases: ['commands','totalcommand'],
    usage: '',
    cooldown: 2,
    args: 0,
    hidden: false,
    catergory: 'Utility',
    async execute(client, message, args) {
        const { EmbedBuilder } = require('discord.js');
        try {
            let commands = client.commands;
            let helpEmbed = new EmbedBuilder()
                .setTitle(`Total Commands`)
                .setColor("Random")
                .setDescription(`The bot has a total of ${commands.size} commands!`)
                .setFooter({text:`Please do +help [command] for more information`});

            return message.channel.send({embeds:[helpEmbed]});
        } catch (err) {
            console.log(err);
            return message.reply(`Oh no, an error occurred. Try again later!`);
        }
    }
};
