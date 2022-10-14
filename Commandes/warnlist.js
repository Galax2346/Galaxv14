const Discord = require("discord.js");

module.exports = {

    name: 'warnlist',
    description: "🔨 Permet d'afficher les avertissements d'un utilisateur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: `🔨 Modération`,
    options: [{
        type: "user",
        name: "membre",
        description: "Le membre à afficher les avertissements",
        required: true,
        autocomplete: false
    }],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply("Pas de membre !")

        db.query(`SELECT * FROM warns WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async(err, req) => {

            if (req.length < 1) return message.reply("Ce membre n'a aucun avertissements sur ce serveur !")
            await req.sort((a, b) => parseInt(b.date) - parseInt(a.date))

            let Embed = new Discord.EmbedBuilder()
                .setColor("Blue")
                .setTitle(`Avertissements de ${user.tag}`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: "Warns" })

            for (let i = 0; i < req.length; i++) {

                Embed.addFields([{ name: `Avertissement n°${i+1}`, value: `**» Auteur :** **${(await bot.users.fetch(req[i].author)).tag}\n**» ID :** **${req[i].warn}\n**» Raison :** **${req[i].reason}\n**» Date :** **<t:${Math.floor(parseInt(req[i].date / 1000))}**` }])
            }

            await message.reply({ embeds: [Embed], ephemeral: true })
        })
    }
}