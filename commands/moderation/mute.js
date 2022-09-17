module.exports = {
    name: 'mute',
    description: 'Mutes a user at admins request',
    aliases: ['mute'],
    usage: '',
    cooldown: 2,
    args: 3,
    hidden: false,
    catergory: 'Moderator',
    async execute(client, message, args) {
    const {PermissionsBitField} = require("discord.js")

        let member = message.mentions.members.first();
        if (!args[0]){
            return message.channel.send("Please mention a user.");
            
        }else{
            if(!args[1]){
                if(!member){
                    return message.channel.send("First argument is not a member.");
                }else{
                   return message.channel.send(`Please enter a time interval in minutes to mute ${member.tag}`);
                }
            }else{
                if(!args[2]){
                    return message.channel.send("Please enter a reason for the mute.");
                }else{
                    if (member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers])) {
                        member.timeout(parseInt(args[1])* 60 * 1000, args[2].toString()).then(console.log).catch(console.error) 
                        .then(console.log)
                        .catch(console.error);
                        //console.log(member);
                        message.channel.send(`${member.user.username} was muted for ${args[1]} minutes.`);
                      
                    }else{
                        message.channel.send("user does not have authority to mute members (requires both kick and ban permissions)");
                    }
                
                
                }
            }
        }
    },
};