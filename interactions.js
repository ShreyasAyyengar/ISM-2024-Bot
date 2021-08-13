const {MessageActionRow, MessageButton} = require("discord.js");
const Discord = require("discord.js");
const config = require('./System/config.json');
const bot = new Discord.Client({
    partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'],
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES",
        "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
});

const guildId = "845250431943835648"
const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());

bot.on('ready', async () => {
    console.log('ISM 2024 Bot Loaded! (INTERACTIONS)')

    const data = {
        name: 'help',
        description: "View a List of Commands, and How to Receive Extra Help.",
    }

    const command = await bot.guilds.cache.get(guildId)?.commands.create(data);
})

bot.on('interactionCreate', async interaction => {
    if (interaction.commandName === "verify") {
        if (interaction.channel.id === "845482156277104671") {
            let verifiedRole = interaction.guild.roles.cache.find(role => role.id === "845251704039276554")
            let unverifedRole = interaction.guild.roles.cache.find(role => role.id === "845252495277555712")
            let name = uppercaseWords(interaction.options.getString("first-name-initials"))

            if (!name.match(/[^A-Za-zÀ-Źà-ź| |]/g)) {
                interaction.member.roles.add(verifiedRole).catch(console.error)
                interaction.member.roles.remove(unverifedRole).catch(console.error)
                interaction.member.setNickname(name).catch(console.error)
                interaction.reply({
                    content: "Successfully verified! Welcome to the community " + name + "! Head over to <#845250431943835651> to introduce yourself!",
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    content: "Invalid! Please do not include special characters in your name, such as `!, @, *, '`",
                    ephemeral: true
                })

            }
        }
    }

    if (interaction.commandName === "verifyhelp") {
        if (interaction.channel.id === "845482156277104671") {
            let staffchannel = interaction.guild.channels.cache.find(channel => channel.id === "845481280258048010")

            const verifyHelp = new Discord.MessageEmbed()
                .setTitle("Someone needs help!")
                .setDescription(interaction.user.tag + " is requesting help in <#845482156277104671>ing their account.")
                .addField("If the bot is not verifying them properly", "Manually remove the role UNVERIFIED and add the '24 role to their name. Ask them their first and last name and set that as their nickname", true | false)
                .setThumbnail(interaction.user.avatarURL(interaction.user.avatar))
                .setTimestamp()
                .setColor('RED')
            staffchannel.send({embeds: [verifyHelp]})
            interaction.reply({
                content: 'Help is on its way! I have notified the staff team that you are having some trouble. If you are not able to get a response, DM one of our council members directly so that they can help you get verified!',
                ephemeral: true
            })
        } else {
            interaction.reply({content: 'You are already verified!', ephemeral: true})
        }
    }

    if (interaction.commandName === "homeworkhelp") {
        interaction.reply({content: "This command is not available yet!", ephemeral: true})
        // if (interaction.channel.id === "845482004611072000") {
        //     let homeworkChannel = interaction.guild.channels.cache.find(c => c.id === "845480402243026984")
        //     let subject = interaction.options[0].value.toUpperCase()
        //     let topic = interaction.options[1].value.toUpperCase()
        //     let member = interaction.user
        //     const homeworkRequest = new Discord.MessageEmbed()
        //         .setTitle(interaction.member.nickname + " is requesting help with their homework!")
        //         .addField("With Subject: ", subject.toUpperCase(), true)
        //         .addField("On Topic: ", topic.toUpperCase(), true)
        //         .setTimestamp()
        //         .setThumbnail(member.displayAvatarURL())
        //         .setColor('ORANGE')
        //
        //
        //     homeworkChannel.send(homeworkRequest).then(homeworkChannel.send("<@&848113739907072020>"))
        //     interaction.reply("Your request for help has been put fourth in <#845480402243026984>. Keep an eye out for any replies in that channel", {ephemeral: true})
        // } else {
        //     interaction.reply("Please execute this command in <#845482004611072000>", {ephemeral: true})
        // }
    }

    if (interaction.commandName === "src") {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Link ->')
                    .setStyle('LINK')
                    .setURL('https://github.com/ShreyasAyyengar/ISM-2024-Bot')
            );
        interaction.reply({content: "Source Code and Bug Reports:", ephemeral: true, components: [row]})
    }

    if (interaction.commandName === "invite") {
        const inviteURL = new Discord.MessageEmbed()
            .setDescription("ISM 2024 Permanent Discord Invite ----> https://discord.gg/fGuFQwMDKn")
            .setColor('#ffb320')
        interaction.reply({embeds: [inviteURL]})
    }

    if (interaction.commandName === "ticket-open") {

        if (interaction.channel.name === "bot-commands") {

            const channel = await interaction.guild.channels.create(`ticket: ${interaction.user.tag}`)
            await channel.setParent('848454206646124574')
            await channel.permissionOverwrites.edit(interaction.guild.id, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            })
            await channel.permissionOverwrites.edit(interaction.user, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })

            const ticketopened = new Discord.MessageEmbed()
                .setTitle("ticket-" + interaction.user.tag)
                .setDescription("Hello <@" + interaction.user.id + ">! You have successfully opened ticket. A member of council will be with you shortly!")
                .addField("To get started:", "For the council to help you as best as possible, please send the issue that you are having in this channel now. " +
                    "Be as specific as possible. If it's a technical issue, tell us what you have already tried and send any screenshots if applicable.")
                .addField("Finished?", "If you are no longer need any assistance / support, or if we have solved your issue please click the lock emoji at the bottom of this message.")
                .setFooter("If you have not received a response within 10 minutes of your last message, you can ping an online member of council here.")
                .setThumbnail(interaction.user.displayAvatarURL())
                .setTimestamp()
                .setColor(config.colour)

            const reactionMessage = await channel.send({embeds: [ticketopened], ephemeral: true}).catch(console.error)
            try {
                reactionMessage.react("🔒")
            } catch (err) {
                channel.send("*Developers Notice: `emojis failed to react`")
                throw err;
            }

            const collector = await reactionMessage.createReactionCollector(
                (reaction, user) => interaction.guild.members.cache.find((member) => member.id === user.id).permissions.has('ADMINISTRATOR'),
                {dispose: true}
            )

            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === "🔒" && user.id !== "845492048617930782") {
                    const Closing = new Discord.MessageEmbed()
                        .setTitle("Closing...")
                        .setDescription("Thank you for reaching out <@" + interaction.user.id + ">! This ticket will now close in 10 seconds. If you need anymore help, please run `/ticket-open`.")
                        .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                        .setTimestamp()
                        .setColor(config.colour)
                    channel.send({embeds: [Closing]});
                    setTimeout(() => channel.delete(), 10000)
                }
            })

            const opening = new Discord.MessageEmbed()
                .setTitle("Opening...")
                .setDescription("We are opening a ticket for you in <#" + channel + ">. We will be right with you!")
                .setThumbnail(interaction.user.displayAvatarURL())
                .setTimestamp()
                .setColor(config.colour)
            interaction.reply({embeds: [opening], ephemeral: true})
        } else {
            interaction.reply({content: "Please execute this command in <#845480329867296819>", ephemeral: true})
        }
    }

    if (interaction.commandName === "ticket-close") {

        if (interaction.member.permissions.has('ADMINISTRATOR')) {

            let channel = await interaction.guild.channels.cache.find(channel => channel.id === interaction.channel.id && channel.name.startsWith("ticket-"))

            if (channel) {

                const Closing = new Discord.MessageEmbed()
                    .setTitle("Closing...")
                    .setDescription("Thank you for reaching out " + uppercaseWords(interaction.channel.name.slice(7).replaceAll(/[^A-Za-z0-9]/g, "")) + "! This ticket will now close in 10 seconds. If you need anymore help, please run `/ticket-open`.")
                    .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                    .setTimestamp()
                    .setColor(config.colour)
                await channel.send({embeds: [Closing]});
                await setTimeout(() => channel.delete(), 10000)
            } else {
                await interaction.reply({content: "You can only do this in ticket channels!", ephemeral: true})
            }
        } else {
            await interaction.reply({content: "You do not have permission to use this command!", ephemeral: true})
        }
    }

    if (interaction.commandName === "help") {
        interaction.reply({content: "Coming soon!", ephemeral: true})
    }

})

bot.login(config.token)