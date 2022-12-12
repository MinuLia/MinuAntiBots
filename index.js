const Discord = require('discord.js');

const {config} = require('./config');

// Events
const {messageCreate} = require("./events/messageCreate.js");

/*
* Useful resources:
*
* - Documentation: https://discord.js.org/#/docs/main/stable/general/welcome
* - Guide: https://discordjs.guide/#before-you-begin
* - List of events: https://discord.js.org/#/docs/main/stable/class/Client
* */


/*
* TODO
*
* - Stock messages in the memory [index -> [user, created_at]]
* - After each message, get last 10 messages (remove all others from memory as well), check the created_at timestamp. If less than 15s between last and 10th, then mute/ban user
*
* */

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

// When bot is ready
client.on('ready', () => {
    console.log('Bot Connected!');
});


// When a message is posted
client.on('messageCreate', async message => {
    // If no message
    if (!config.listen.messageCreated) {
        return;
    }


});


// Then connect to bot
client.login(process.env.TOKEN);