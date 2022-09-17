//const Util = require('../../util/MitUtil.js');
const axios = require('axios');
const Discord = require("discord.js");

module.exports = {
  name: 'ipinfo',
  description: "Gets info about the IP address",
  aliases: ['ip', 'ipadress'],
  usage: ' [ip]',
  cooldown: 2,
  args: 0,
  catergory: 'Utility',
  async execute(client, message, args) {
    try {
      const Discord = require("discord.js");
      if (!args[0]) return message.channel.send("Please input a valid ip address!");

      this.getIPINFO(args[0]).then(response => {
        if (response.data.status === "success") {
          let embedStats = new Discord.EmbedBuilder()
            .setTitle(`IP Information`)
            .setColor("#8B0000")
            .setDescription(`**Moblie:** ${response.data.mobile}\n**Proxy:** ${response.data.proxy}`)
            .addFields(
                {name:"Internet Service Provider:", value:`${response.data.isp}`, inline:true},
                {name:"AS Numer and Organization:", value:`${response.data.as}`, inline:true},
                {name:"continent:", value:`${response.data.continent}`, inline:true},
                {name:"Country:", value:`${response.data.country}`, inline:true},
                {name:"City:", value:`${response.data.city}`, inline:true},
                {name:"Timezone:", value:`${response.data.timezone}`, inline:true},
                {name:"Lat & Lon:", value:`Lat: ${response.data.lat} | Lon: ${response.data.lon}`, inline:true},
                {name:"Currency:",value: `${response.data.currency}`, inline:true}
                )
            .setFooter({text:"Requested by " + message.author.tag})
            .setTimestamp(new Date())

          return message.channel.send({embeds:[embedStats]});
        }
        else {
          return message.channel.send("Please enter a valid ip address!");
        }
      });
    }
    catch (err) {
      console.log(err);
      return message.reply(`Oh no, an error occurred. Try again later!`);
    }
  },
  async getIPINFO(ip) {
    try {
      return axios.get(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,query`, { responseType: 'json', timeout: 10000 });
    } catch (e) {
      console.log(e);
    }
  }
};