const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")

module.exports = {

    name: "rank",
    description: "Envoie l'xp d'un membre",
    permission: Discord.PermissionFlagsBits.SendMessages,
    permission: "Aucune",
    dm: false,
    category: "Information",
    options: [{
            type: "user",
            name: "utilisateur",
            description: "L'exp du membre à voir",
            required: false,
            autocomplete: false
        },

    ],

    async run(bot, message, args, db) {

        let user;
        if (args.getUser("utilisateur")) {
            user = args.getUser("utilisateur")
            if (!user || !message.guild.members.cache.get(user ?.id)) return message.reply("Pas de membre")
        } else user = message.user;

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user  = '${message.user.id}'`, async(err, req) => {

            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async(err, all) => {

                if (req.length < 1) return message.reply("Ce membre n'a pas d'exp")

                await message.deferReply()

                const calculXp = (xp, level) => {
                    let xptotal = 0;
                    for (let i = 0; i < level + 1; i++) xptotal += i * 1000
                    xptotal += xp;
                    return xptotal
                }

                let leaderboard = await all.sort(async(a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)
                let rank = leaderboard.findIndex(r => r.user === user.id) + 1
                let need = (level + 1) * 1000;

                let Card = await new Canvas.Card()
                    .setBackground("https://external-preview.redd.it/2SRhl749JDfaJWRcZ39oVm0Jl3sHQ1w6ROlBHTfioOw.jpg?width=640&crop=smart&auto=webp&s=88f4d6d989dcbaa651267474784abd0cf1078b9e")
                    .setBot(bot)
                    .setColorFont(bot.color)
                    .setRank(rank)
                    .setUser(user)
                    .setColorProgressBar("#FF0000")
                    .setGuild(message.guild)
                    .setXp(xp)
                    .setLevel(level)
                    .setXpNeed(need)
                    .toCard()

                await message.followUp({ files: [new Discord.AttachmentBuilder(Card.toBuffer(), { name: "rank.png" })] })
            })
        })

    }
}