const { MessageEmbed } = require('discord.js');

const messages = [];

// Entrypoint
exports.putMessage = async (client, message) => {
    // If message has not been sent by a bot
    if (!message.system) {
        // Add new message to the array
        const obj = {};
        obj.author_id = message.author.id;
        obj.message_id = message.id;
        obj.message_content = message.content;
        obj.date_created = Date.now();
        messages.push(obj);


        // if length is greater than 10 and trigger flood method
        if (getForUser(message.author.id).length >= 10) {
            // Remove the oldest message from memory array
            const msgs = getForUser(message.author.id);
            const oldest_message_for_this_user = msgs[msgs.length - 1];
            const message_index = messages.indexOf(oldest_message_for_this_user);
            messages.splice(message_index, 1);

            // Call flood method
            if (isFlooding(message.author.id)) {
                const guildMember = await message.guild.members.cache.get(message.author.id);
                const targetChannel = await message.guild.channels.cache.get(process.env.MAIN_CHANNEL || message.channel.id);
                const username = message.author.username;
                if (guildMember) {
                    await guildMember.ban({deleteMessageSeconds: 604800, reason: "Flooding (MinuAntiBots)"})
                        .then(async () => {
                            // Delete user messages
                            const userMessages = (await message.channel.messages.fetch())
                                .filter(m => m.author.id === message.author.id);
                            await message.channel.bulkDelete(userMessages);

                            // Post embed message
                            const embed = buildEmbedMessage(username);
                            targetChannel.send({embeds: [embed]});
                        })
                        .catch(() => {});
                }
            }
        }
    }
}


// Get all saved messages for the given user
const getForUser = (user_id) => {
    return messages
        .filter(e => e.author_id === user_id)
        .sort((a, b) => a.date_created < b.date_created ? 1 : -1);
}


// Flood check
const isFlooding = (user_id) => {
    const msgs = getForUser(user_id);

    const message_latest = msgs[0];
    const message_oldest = msgs[msgs.length - 1];

    // If 10 messages has been sent in 10 seconds by the same user, then mute him
    return message_latest.date_created - message_oldest.date_created <= 10000;
}


const buildEmbedMessage = (username) => {
    return new MessageEmbed()
        .setColor(0x03A9F4)
        .setTitle('Sheeeeeeesh')
        .setDescription(`Bye bye ${username || '(I don\'t even know your name bi***)'} 👋`)
        .addFields(
            {
                name: 'Ban Reason',
                value: 'Flood'
            }
        )
        .setTimestamp();
}