const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Bannir une personne",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Moderation",
    options: [{
        type: "user",
        name: "membre",
        description: "Le cotorep a bannir",
        required: true

    }, {
        type: "string",
        name: "raison",
        description: "La raison du bannissement",
        required: false
    }],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if (!user) return message.reply("Aucune personne a bannir !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if (!reason) reason = "Pas de raison fournie"

            if (message.user.id === user.id) return message.reply("Essaie pas de te bannir !")
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peux pas bannir le fondateur du serveur !")
            if (member && !member.bannable) return message.reply("Je ne peux pas bannir cette personne !")
            if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir une personne qui a le même rôle que toi !")
            if ((await message.guild.bans.fetch()).get(user.id))

                return message.reply("Cette personne est déja banni !")

            try { await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``) } catch (err) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, { reason: reason })


        } catch (err) {

            return message.reply("pas de membre a bannir !")
        }

    }



}