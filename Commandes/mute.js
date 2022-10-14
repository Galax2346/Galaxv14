const Discord = require("discord.js");
const ms = require("ms")

module.exports = {
    name: "mute",
    description: "mute a member",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [{
        type: "user",
        name: "member",
        description: "the member to mute",
        required: true
    }, {
        type: "string",
        name: "time",
        description: "the time to mute",
        required: true
    }, {
        type: "string",
        name: "reason",
        description: "the reason for the mute",
        required: false
    }],

    async run(bot, message, args) {

        let user = args.getUser("member")
        if (!user) return message.reply("no member !")
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply("no member !")


        let time = args.getString("time")
        if (!time) return message.reply("no time !")
        if (isNaN(ms(time))) return message.send("not the right size !")
        if (ms(time) > 86400000) return message.reply("the mute cannot last more than 28 days !")

        let reason = args.getString("reason")
        if (!reason) reason = "no reason provided !";

        if (message.user.id === user.id) return message.reply("dont die alone !")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("do not mute the owner of the server !")
        if (!member.moderatable) return message.reply("I can't mute this member !")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("you can't mute this member !")
        if (member.isCommunicationDisabled()) return message.reply("this member is already muted !")

        try { await user.send(`you have been moved from the server ${message.guild.name} by ${message.user.tag} for ${time}for reason : \`${reason}\``) } catch (err) {}

        await message.reply(`${message.user} to mute ${user.tag} during ${time} for the reason : \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
}