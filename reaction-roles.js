const Discord = require("discord.js");
const config = require('./System/config.json');
const bot = new Discord.Client({
    partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'],
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES",
        "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
});

bot.on('ready', () => {
    console.log('ISM 2024 Bot Loaded! (REACTION ROLES)')
})

bot.on('messageReactionAdd', async (reaction, user) => {

    let applyRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        try {
            if (role && member) {
                console.log("Role and member found.");
                await member.roles.add(role);
                console.log("Done.");
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            console.log(msg.id);
            if (msg.id === '875525830569234462') {
                console.log("Cached")
                await applyRole();
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Not a partial.");
        if (reaction.message.id === '875525830569234462') {
            console.log(true);
            await applyRole();
        }
    }
});

bot.on('messageReactionRemove', async (reaction, user) => {
    let removeRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        try {
            if (role && member) {
                console.log("Role and member found.");
                await member.roles.remove(role);
                console.log("Done.");
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            console.log(msg.id);
            if (msg.id === '875525830569234462') {
                console.log("Cached")
                await removeRole();
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Not a partial.");
        if (reaction.message.id === '875525830569234462') {
            console.log(true);
            await removeRole();
        }
    }
})

bot.login(config.token)