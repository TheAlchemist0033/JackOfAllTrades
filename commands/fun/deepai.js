module.exports = {
    name: 'deepai',
    description: 'Generate images from text using deepai.',
    aliases: ['ai'],
    usage: '',
    cooldown: 2,
    args: 0,
    hidden:false,
    catergory: 'Fun',
    async execute(client, message, args) {
        try{
        if(args.length > 0){
        const deepai=require("deepai");
        deepai.setApiKey(process.env.DEEPTOK);
        var mess = await message.channel.send("Result processing...(This may take a while. Please only run once.)");
       
        var result = await deepai.callStandardApi("text2img", {
            text: args.join(" ")
        });
        console.log(result);
        mess.edit(`Result rendered! ResultID: ${result.id} Result:${result.output_url}`)
        
    }else{
        message.channel.send("You need to provide text to handle.");
    }
}catch(err){
    console.log(err);
    return message.reply(`Oh no, an error occurred. Try again later!`);
}

    },
};