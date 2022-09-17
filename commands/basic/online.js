module.exports = {
    name: 'online',
    description: 'Tells how many users are online.',
    aliases: ['online'],
    usage: '',
    cooldown: 2,
    args: 0,
    hidden: false,
    catergory: 'Utility',
    async execute(client, message, args) {
        console.log(message.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
            const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
            // Now you have a collection with all online member objects in the totalOnline variable
            message.channel.send(`There are currently ${totalOnline.size} members online in this guild!`);
        }))
    },
}
//TODO
//dsds