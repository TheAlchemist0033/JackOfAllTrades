module.exports = {
    name: 'searchtweets',
    description: 'Grabs a number of tweets for instantaneous viewing.',
    aliases: ['searchtweets'],
    usage: '',
    cooldown: 2,
    args: 0,
    hidden: false,
    catergory: 'Twitter(Cybersec)',
    async execute(client, message, args) {
        const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const exembed = new EmbedBuilder()
	.setColor(0x1f3a66)
	.setTitle('Retrieved Tweets')
	.setURL('https://Twitter.com')
	.setAuthor({ name: message.author.username})
	.setDescription('Lists all retreived tweets which meet the given criteria.')
	.setThumbnail('https://media4.giphy.com/avatars/TAQTFUL/EYxIlyCBXtRX.gif')
	.setTimestamp()
	.setFooter({ text: 'Tweet Tweet', iconURL: 'https://media4.giphy.com/avatars/TAQTFUL/EYxIlyCBXtRX.gif' });

        //base twitter declares
        const {
            TwitterApi
          } = require('twitter-api-v2');
          
        TwitClient = new TwitterApi({ //be sure to configure these in the .env first.
            appKey: process.env.TWITKEY,
            appSecret: process.env.TWITAPPSEC,
            accessToken: process.env.TWITACCTOK,
            accessSecret: process.env.TWITACCSEC
        });
        const cvebyid = require("./cvebyid.js");
        const postbid = require("./postid.js");
        //end base twitter declares
        if (!args[0] && args <= 20) {
            message.channel.send("You must enter a number of tweets to retreive and it must be less than 20.");
        } else {
            if(!args[1]){
                message.channel.send("You must enter a search query (all queries will be filtered explicitly for those mentioning a CVE)");
            }else{
                var query = args[1];
                const jsTweets = await TwitClient.search(query, {
                    'max_results': args[0]
                });
                console.log(query + args[0]);
                //pulls all the tweets using the api.
                //var fullresp = [];
                var allbody = "";
                var cveregex = /(CVE|cve)-[0-9]{4}-([0-9]{5}|[0-9]{4})/g //eliminates tweets not conforming to the possibility of CVE's
                var tweets = [];
                //var cvelistdupe = [];
                
                for (const tweet of jsTweets) { // iterates through all fetched tweets.
                    //console.log(tweet);
                    await postbid.findOne({
                        PostID: tweet.id
                    }, (async (err, res) => {
                        if (err) console.log(err);
                        var sres = await res;
                        if (!sres) {//if the tweet does not exist in the database. 
                            if(cveregex.test(tweet.text)){
                                //add it to the database
                                const post = new postbid({
                                    // PostIDs: message.guild.id,
                                    PostID: tweet.id,
                                    Exists: 1
                                })
                                // message.channel.send("value stored for " + uusername.displayName)
                                await post.save().catch(err => console.log(err));
                                tweets.push(await tweet);
                               /* console.log(`tweety ${tweets.length}`);
                                console.log("regex matched")*/
                            }else{
                                return; //console.log("Regex did not match.");
                            }

                        }else{
                            console.log(sres);
                        }
                    })).clone().catch(function(err){ console.log(err)});
                }  

                //console.log(`tweety'nt ${await (tweets.length)}`);
                if((tweets.length) >=1){
                            console.log(tweets.length);
                            for(let i = 0; i<tweets.length; i++){
                                allbody = allbody + tweets[i].text;
                                cvelistdupe = await allbody.match(cveregex);
                                //console.log(allbody);//pulls only tweets which contain a CVE
                                const counts = {};

                                /*for (const cve of cvelistdupe) {
                                    counts[cve] = counts[cve] ? counts[cve] + 1 : 1;
                                }*/
                                var cvelist = [...new Set(cvelistdupe)];
                                exembed.addFields({name:`id ${tweets[i].id}`,value:`Content: ${tweets[i].text}`});
                            }/*
                            for (let i = 0; i < tweets.length; i++) { //of all the newly filtered tweets...
                                var initarg = tweets[i];
                                message.channel.send("logging initarg to console");
                                console.log(initarg);
                                var id = initarg.id;                                                  //needs rework 
                                var body = initarg.text;     
                                allbody = allbody + body           
                                if(i < 22){                        //
                                    exembed.addFields({name:`ID: ${id}`,value:`Content: ${body}`});
                                }
                                                                //end needs rework
                            }
                            if (allbody.length > 1) {
                                cvelistdupe = await allbody.match(cveregex);
                                console.log(allbody);//pulls only tweets which contain a CVE
                                const counts = {};

                                for (const cve of cvelistdupe) {
                                    counts[cve] = counts[cve] ? counts[cve] + 1 : 1;
                                }
                                var cvelist = [...new Set(cvelistdupe)];
                                
                            }*/
                            exembed.addFields({name:`CVES Mentioned:`,value:cvelist.join(" ")});
                            message.channel.send({embeds:[exembed]});
                }

        }
    }
    },
};