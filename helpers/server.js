const {TextChannel} = require("discord.js");

exports.getServerData = async (message) => {
    // Get all users
    const usernames = [];
    const usernamesFetch = await message.guild.members.fetch();
    for (let username of usernamesFetch) {
        usernames[username[0]] = username[1].user.username;
    }

    // Get all channels
    const channels = [];
    const channelsFetch = await message.guild.channels.fetch();
    for (let channel of channelsFetch) {
        if (channel[1] instanceof TextChannel) {
            channels[channel[0]] = channel[1].name;
        }
    }

    // Get all roles
    const roles = [];
    const rolesFetch = await message.guild.roles.fetch();
    for (let role of rolesFetch) {
        roles[role[0]] = role[1].name;
    }

    return {
        usernames: usernames,
        channels: channels,
        roles: roles,
    }
}