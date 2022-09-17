const Util = require('../../util/jacktill.js');
const Discord = require("discord.js");
//const db = require('../../util/Database.js');

module.exports = {
    name: 'help',
    description: 'Returns the help list and all commands',
    aliases: ['commands'],
    usage: '',
    cooldown: 2,
    args: 0,
    catergory: 'Utility',
    hidden: false,
    async execute(client, message, args) {
        const { EmbedBuilder } = require('discord.js');
        let ServerPrefix = "+"
        if (args.length > 0) {
            const command = client.commands.get(args[0]) ||
                client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            console.log(command)
            if (!command) return message.reply("No such command!");

            let reply = "**Description:** " + command.description + "\n";
            reply += "**Cooldown:** " + command.cooldown + "\n";
            reply += "**Aliases:** " + command.aliases + "\n";
            reply += "\n**Usage:** \n" + ServerPrefix + command.name + " " + command.usage + "\n";

            const UsageEmbed = new Discord.EmbedBuilder()
                .setColor('#8B0000')
                .setTitle('Command: ' + ServerPrefix + command.name)
                .setDescription(reply)
                .setFooter({text:"Requested by " + message.author.tag})
                .setTimestamp();

            return message.channel.send({embeds:[UsageEmbed]});
        }

        let commands = Array.from(client.commands.values())
        
        //console.log(commands.keys)
        let Description = "";

        let helpEmbed = new Discord.EmbedBuilder()
            .setTitle(`Help | List of all commands (${commands.length})`)
            .setColor("#8B0000")
            .setFooter({text:`Please do ${ServerPrefix}help [command] for more information`});

        var catergory = " ";
        commands.sort(function (a, b) {
            if (a.catergory < b.catergory) { return -1; }
            if (a.catergory > b.catergory) { return 1; }
            return 0;
        });

        commands.forEach((cmd) => {
            console.log("+++++++++++++++++++++++++++++++\n"+cmd)
            console.log("----------------")
            if (cmd.hidden) return;

            if (message.channel.nsfw != true) {
                if (cmd.catergory == "NSFW") return;
            }
            

            if (catergory == " ") {
                catergory = cmd.catergory;
            }

            if (cmd.catergory != catergory) {
                helpEmbed.addFields({name:`# ${catergory}`,value: Description});
                Description = "";
                catergory = cmd.catergory;
            }

            if (catergory == cmd.catergory) {
                Description += `\`\`${cmd.name}\`\`, `;
            }
        });


        helpEmbed.addFields({name:`# ${catergory}`,value:Description});
        return message.channel.send({embeds:[helpEmbed]});
    }
};
