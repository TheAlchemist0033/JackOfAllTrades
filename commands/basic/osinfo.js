module.exports = {
    name: 'osinfo',
    description: 'Gives info about OS.',
    aliases: ['osinfo'],
    usage: '',
    cooldown: 2,
    args: 0,
    hidden: false,
    catergory: 'Utility',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const { EmbedBuilder } = require('discord.js');
        const osu = require('node-os-utils');
        var cpu = osu.cpu;
        var count = cpu.count();
        var model = cpu.model();
        const exembed = new EmbedBuilder()
            .setColor(0x1f3a66)
            .setTitle('OSinfo')
            .setAuthor({ name: message.author.username})
            .setDescription('Lists Operating System Information')    
            .setTimestamp()
            .addFields({name:`CPU Model`,value:`Content: ${model}`});
        await cpu.usage()
          .then(cpuPercentage => {
            console.log(cpuPercentage);
            exembed.addFields({name:`CPU Usage`,value:`Content: ${cpuPercentage}`});
          })
        await cpu.free()
        .then(info => {
        console.log(info)
        exembed.addFields({name:`CPU Free`,value:`Content: ${info}`});
        })
        exembed.addFields({name:`CPU Count`,value:`Content: ${count}`});
        await message.channel.send({embeds:[exembed]})
       
    },
};