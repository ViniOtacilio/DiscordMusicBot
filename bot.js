const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require ('ytdl-core');
const streamOptions = {seek: 0, volume: 1};


const token = 'NjM0ODEzMzgxMTMxMzcwNDk3.Xan-EQ.iZeCAvOPZe66HS6fEIf0qgygpts';
bot.login(token);

bot.on('ready', () => {
    console.log('estou pronto para ser usado!');
});

bot.on('message', msg => {
    if (msg.author.bot){
        return;
    }
    if (msg.content.toLowerCase().startsWith("?play")){
        let VoiceChannel = msg.guild.channels.find( channel => channel.id === '634813707255414787');
            if(VoiceChannel == null){
                console.log('Canal não foi encontrado');
            }
            if(VoiceChannel !== null){
                console.log('O canal foi encontrado!');
                    VoiceChannel.join()
                    .then ( connection => {
                        const stream = ytdl('https://www.youtube.com/watch?v=tfSS1e3kYeo',{filter: 'audioonly'})
                        const DJ = connection.playStream(stream, streamOptions);
                        DJ.on('end', end => {
                            VoiceChannel.leave();
                        })
                    })
                        .catch(console.error);
            }
    }
})