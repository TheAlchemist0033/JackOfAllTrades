module.exports = {
    name: 'ban',
    description: 'Bans a user at admins request',
    aliases: ['ban'],
    usage: '',
    cooldown: 2,
    args: 1,
    hidden: false,
    catergory: 'Utility',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const {PermissionsBitField} = require("discord.js")
        let member = message.mentions.members.first();
        if(!member){ message.reply("Please mention a valid member of this server"); return;}
        if(!member.kickable){ message.reply("This member is not kickable"); return;}
        // Now check if the user has the Kick Members Permission
        if (member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers])) {
            member.ban();
            message.channel.send(`${member.tag} was banned.`);
        }else{
            message.channel.send("user does not have authority to ban members (requires both kick and ban permissions)");
        }
    },
};