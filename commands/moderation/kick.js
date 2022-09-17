module.exports = {
    name: 'kick',
    description: 'Kicks a user at admins request',
    aliases: ['kick'],
    usage: '',
    cooldown: 2,
    args: 1,
    hidden: false,
    catergory: 'Moderator',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const {PermissionsBitField} = require("discord.js")
        let member = message.mentions.members.first();
        if(!member){ message.reply("Please mention a valid member of this server"); return;}
        if(!member.kickable){ message.reply("This member is not kickable"); return;}
        // Now check if the user has the Kick Members Permission
        if (member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers])) {
            member.kick();
            message.channel.send(`${member.tag} was kicked.`);
        }else{
            message.channel.send("user does not have authority to kick members (requires both kick and ban permissions)");
        }
    },
};