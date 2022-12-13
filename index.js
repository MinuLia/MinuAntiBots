const Discord = require('discord.js');
const dotenv = require('dotenv');
const {putMessage} = require("./helpers/messageManager.js");

// Init .env file
dotenv.config();


/*
* Useful resources:
*
* - Documentation: https://discord.js.org/#/docs/main/stable/general/welcome
* - Guide: https://discordjs.guide/#before-you-begin
* - List of events: https://discord.js.org/#/docs/main/stable/class/Client
* */


const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

// When bot is ready
client.on('ready', () => {
    console.log('MinuAntiBots Ready!');
});


// When a message is posted
client.on('messageCreate', async (message) => {
    await putMessage(client, message);
});


// Then connect to bot
client.login(process.env.TOKEN);