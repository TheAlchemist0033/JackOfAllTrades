require('dotenv').config({path:"./.env"});
const fs = require("fs");
const {
    TwitterApi
  } = require('twitter-api-v2');
  
const Discord = require('discord.js');
const {
    Client,
    GatewayIntentBits,
    ApplicationCommandOptionWithChoicesAndAutocompleteMixin
} = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]
});
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017";
//Twitter Configuration System:
TwitClient = new TwitterApi({ //be sure to configure these in the .env first.
    appKey: process.env.TWITKEY,
    appSecret: process.env.TWITAPPSEC,
    accessToken: process.env.TWITACCTOK,
    accessSecret: process.env.TWITACCSEC
})
const cvebyid = require("./commands/twitter/cvebyid.js");
const postbid = require("./commands/twitter/postid.js");
const utdb = require("./utilities.js");
try{
    mongoose.connect(
        url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ()=> console.log("Mongoose has connected sucessfully.")
    );
}catch (e){
    console.log("Encountered an error connecting.");
}/* 
async function searchTweets(query){
    const jsTweets = await client.search(query)
}*/
//end Twitter Config System
//additional declares 
client.commands = new Discord.Collection();
let comList = [];
const config = require("./config.json");
const { createVerify } = require('crypto');
fs.readdir("./commands/", (err, folders) => {
    if (err) throw err;
    for (let i = 0; i < folders.length; i++) {
        fs.readdir(`./commands/${folders[i]}`, (e, files) => {
            if (e) console.log(e)
            let jsfiles = files.filter(f => f.split(".").pop() === 'js');
            if (jsfiles.length < 1) {
                console.log(`No commands in ${folders[i]}`);
                return;
            }
            jsfiles.forEach((file) => {
                let properties = require(`./commands/${folders[i]}/${file}`);
                console.log(`Loaded ${file}`);
                comList.push(file);
                client.commands.set(properties.name, properties)
            })
        })
    }
});
//end declares
client.on("ready", () => {
    console.log(`${client.user.tag} is now active!`);
});
client.on("guildMemberAdd", async (member) => {
    console.log(`${member.user.tag} has joined`);
    await member.guild.roles.fetch() //optional - put it if the role is valid, but is not cached
    let role = member.guild.roles.cache.find(role => role.name === 'Member')
    member.roles.add(role)
});
client.on("messageCreate", async (message) => {
    //message.channel.send("rec.")
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({
                embed: logmessage
            }).then().catch(err => console.log(err));
        }
    }
    if (message.author.bot) return;
    //message.channel.send("test")
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    var prefix = config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const nanargs = message.content.split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    if (command === "eval") {
        if (message.author.id !== "608802993810440223" && message.author.id !== "149686265271418880" && message.author.id !== "221442254504591360") {
            return message.channel.send("USER NOT AUTHORIZED");
        }
        try {
            const code = args.join(" ");
            
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    /*if (command == "help") {
        for(let i = 0; i < comList.length; i++){
            comList[i] = comList[i].slice(0, -3);
        }
        
        message.channel.send(`${comList.join(' ')}`)
    }
    /*client.serverconf.findOne({    ///reserved for database integration
        ServerId: message.guild.id
    }, ((err, res) => {
        if (err) console.log(err);
        if (!res) {
            return;
        } else {
            prefix = res.Prefix
        }
    }))*/
    const cmd = client.commands.get(command);
    if (!cmd) return;
    await utdb.findOne({
        file:1
    }, (async (err, res) => {
        if (err) console.log(err);
        if (!res) {
            const post = new utdb({
                comUsed:1,
                file:1
            })
            await post.save().catch(err => console.log(err));
            console.log("Created Utility Database.")
        }else{
            res.comUsed += 1; 
            console.log(res.comUsed)
            res.save().catch(err=>console.log(err));
    }})).clone()
    console.log("success")
    await cmd.execute(client, message, args);
});

client.login(process.env.BOT_TOKEN)