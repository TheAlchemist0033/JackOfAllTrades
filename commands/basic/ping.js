module.exports = {
    name: 'ping',
    description: 'Determines latency',
    aliases: ['ping'],
    usage: '',
    cooldown: 2,
    args: 0,
    hidden: false,
    catergory: 'Utility',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        message.channel.send(`Gee Whiz, that message took ${Date.now() - message.createdTimestamp}ms and my neurons are firing at ${Math.round(client.ws.ping)}ms/action.`);
    },
};