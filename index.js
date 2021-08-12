const Discord = require("discord.js");
const config = require('./System/config.json')
const bot = new Discord.Client({
    partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'],
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES",
        "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
});

bot.on('ready', async () => {
    console.log('ISM 2024 Bot Loaded! (INDEX)')
    interactions = require("./interactions")
    rroles = require("./reaction-roles")

    // const getApplication = (guildId) => {
    //     const app = bot.api.applications(bot.user.id)
    //     if (config.guildID) {
    //         app.guilds(config.guildID)
    //     }
    //     return app;
    // }
    //
    // const commands = await bot.api
    //     .applications(bot.user.id)
    //     .guilds(config.guildID)
    //     .commands.get()
    // console.log(commands)
    //
    // await getApplication(config.guildID).commands('849123267536748604').delete() // Guild
})

bot.on('messageCreate', msg => {

    if (msg.channel.id === "845482156277104671" || msg.channel.id === "845482004611072000") {
        if (!msg.author.bot) {
            msg.delete();
        }
    }

    if (msg.author.id === "690755476555563019") {

        if (msg.content === "verify") {
            const verify = new Discord.MessageEmbed()
                .setColor('#ffcf1d')
                .setTitle('Verifying!')
                .setURL('https://discord.com/channels/845250431943835648/845250675604848690')
                .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                .addField('To continue using the server\n', '\n\nYou will need to agree to our <#845250675604848690>' +
                    ' Make sure you read them carefully and thoroughly.', true)
                .addField("Once you understand the rules and have no further questions, type:", "`/verify <your first name> <first letter last name>` to verify yourself! By doing so," +
                    " you accept the community rules and promise to abide by them throughout the duration of your stay.")
                .addField("/verify", "We require you to verify with your official first name and first letter of your last name so that other people can easily recognise you!")
                .addField("Offline", "If the <@845492048617930782> is not responding, or is **not online** when you are trying to verify, directly DM a member of council who can help you out.")
                .addField("Any problems?", "If you encounter any problems during the process of verifying please do `/verifyhelp` so that a member of council can further assist you!")
                .setFooter("Example Verify: '/verify Carrilyn P'")
            msg.channel.send(verify)
        }

        if (msg.content === "homework") {
            const homework = new Discord.MessageEmbed()
                .setTitle("Homework!")
                .setDescription("Here is how you can receive help or give help for homework")
                .addField("If you need help:", "If you are stuck or unsure about something from a class you can do `/homeworkhelp <subject> <topic>`. " +
                    "This will ping people who have the <@&848113739907072020> role that you are requesting some help", true | false)
                .addField("If you want to give help:", "If you would like to help others with their homework, head over to <#845482220730974218>, " +
                    "and click the **homework** reaction to receive the <@&848113739907072020> roles. You will receive a ping when someone is requesting help.")
                .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                .setColor('#ffb320')
            msg.channel.send(homework)
        }

        if (msg.content === "general") {
            const general = new Discord.MessageEmbed()
                .setTitle("#general")
                .setDescription("All about <#845250431943835651>")
                .addField("Talk about anything!", "All members can use this channel for general talk & chit-chat. No one topic should be adhered or talked about in this channel." +
                    " Feel free to chill with the rest of <@&845251704039276554>!")
                .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                .setColor('#ffb320')
            msg.channel.send(general)
        }

        if (msg.content === "botcommands") {
            const btocommands = new Discord.MessageEmbed()
                .setTitle("#bot-commands")
                .setDescription("All about <#845480329867296819>")
                .addField("What, Why & How:", "Bot-Commands are a specific messages you can send exclusively to this channel, to activate a response from any of our <@&845482861284950147>s." +
                    " These are not real people, but they can play music and help the council moderate the server. To use the bot commands for their own purpose, take a look at the side where you can see " +
                    "their prefixes. This is what you should use before the message to get their response.", true | false)
                .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                .setImage(`https://i.imgur.com/dG1hGJQ.png`)
                .setColor('#ffb320')
            const image1 = new Discord.MessageEmbed()
                .setImage("https://i.imgur.com/TNWwaHI.png")
                .setColor('#ffb320')
            const image2 = new Discord.MessageEmbed()
                .setImage("https://i.imgur.com/oEBQ6UG.jpg")
                .setColor('#ffb320')
            const info = new Discord.MessageEmbed()
                .setDescription("The <@845492048617930782> will always have the prefix of `/`, since it only uses slash commands")
                .setColor('#ffb320')
            msg.channel.send(btocommands)
            msg.channel.send(image1)
            msg.channel.send(image2)
            msg.channel.send(info)

        }

        if (msg.content === "memes") {
            const memes = new Discord.MessageEmbed()
                .setTitle("#memes-spam")
                .setDescription("All about <#845480352688111657>")
                .addField("All of them!", "In this channel you may send as many memes and 'copy pastas' as you like, " +
                    "and as much spam to your hearts content! However, <#845250675604848690> should still be followed, and any NSFW content or any graphic content will result in a punishment", true | false)
                .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                .setFooter("Happy Spamming!")
                .setColor('#ffb320')
            msg.channel.send(memes)
        }

        if (msg.content === "roles") {
            const rolesinfo = new Discord.MessageEmbed()
                .setTitle("Roles Information and Descriptions!")
                .setDescription("Here are a list of roles in this server, and what they do:")
                .addField("President & Cabinet:", "The 2 Grade Level <@&845251991952162867>s, [<@764035853781041192> and @Aarav], and " +
                    "our 3 <@&845252140661211158>s [<@719912689572380682>, <@483651803146092564>, <@746593505945583637>] are responsible for making sure that the batch is in order. They lead the student body and make sure" +
                    " that your concerns are being voiced over to the admin and vice versa. It is their responsibility to make sure that everyone's voices are " +
                    "being heard. Their goal is to satisfy our batch and make sure we are all in the same page. Most importantly, they aim to promote inclusivity and " +
                    "batch spirit, ensuring that each and every individual in our batch knows that they are a vital part of our community! 💚", false)
                // .addField("", "", false)
                .addField("'24", "<@&845251704039276554>. Just as the Council is responsible for keeping the batch in tact, the rest of the members of the Batch 2024 is responsible " +
                    "for their own actions. Your involvement in our batch means that you will respect every individual and make sure that you are doing your best to stay on track alongside everyone " +
                    "else, asking help when it is needed. Your main job is to take care of yourself as you are a vital part of our community and everyone's involvement is what will make our batch a " +
                    "success!", false)
                .addField("Bots:", "<@&845482861284950147>s are the robots that have certain features like music streaming or moderation commands that help run the" +
                    " server more smoothly and provide a better experience for YOU!", true)
                .addField("Homework:", "The <@&848113739907072020> role can be unlocked at <#845482220730974218>. People with this role will be pinged in <#845480402243026984> when " +
                    "someone requests help with their homework! (Coming soon!)", true)
                .addField("New Students:", "<@&848136989773529099>s are the newbies to our grade! Be kind, Be Respectful and show them what it's like to be a BEARCAT!", false)
                .addField("Pronouns:", "<@&848168218892042279>, <@&848168429383057408>, <@&848168572517613578>, <@&848168608357941289>, <@&848168688333881354>, and " +
                    "<@&848168833914372127> are all gender pronouns that can be assigned to you in <#845482220730974218>. We recommend that you assign the pronouns you identify yourself with " +
                    "so that it is clear what you, and what others would like to be called by :)", false)
                .setThumbnail(bot.user.avatarURL(bot.user.avatar))
                .setColor(config.colour)

            msg.channel.send(rolesinfo)
            msg.delete()
        }
    }
})

bot.on('guildMemberAdd', async member => {

    const welcome = new Discord.MessageEmbed()
        .setTitle("Hi there " + member.user.username + "!")
        .setDescription("Welcome to '2024 Community Discord")
        .addField("To get started:", "Please read our <#845250675604848690> carefully and thoroughly. Then head over to <#845482156277104671> " +
            "and follow the instructions to verify yourself!", true | false)
        .addField("If you are stuck or need help:", "If you are having trouble verifying or you are in need of additional help, please use `/veriyhelp` or DM a member of council.")
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter("--ISM 2024--")
        .setColor('#63e350')
    member.guild.channels.cache.get("866699072877101076").send({embeds: [welcome]})
    member.roles.add("845252495277555712")
})

bot.login(config.token)