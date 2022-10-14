const { TextInputStyle } = require('discord.js')
const Discord = require('discord.js')

module.exports = {

    name: 'support',
    description: 'Permet de signaler un utilisateur',
    permission: Discord.PermissionFlagsBits.SendMessages,
    permission: 'Aucune',
    dm: false,

    async run(MxT, message, args) {

        let Modal = new Discord.ModalBuilder()
            .setCustomId('support')
            .setTitle('Signaler un membre')

        let question1 = new Discord.TextInputBuilder()
            .setCustomId('pseudo')
            .setLabel('Quel est ton Pseudo/ID Discord ?')
            .setRequired(true)
            .setPlaceholder('ton pseudo/ID est...')
            .setStyle(TextInputStyle.Short)

        let question2 = new Discord.TextInputBuilder()
            .setCustomId('Message')
            .setLabel("Votre message ici")
            .setRequired(true)
            .setPlaceholder('Ecrire ici...')
            .setStyle(TextInputStyle.Paragraph)

        let ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);
        let ActionRow2 = new Discord.ActionRowBuilder().addComponents(question2);


        Modal.addComponents(ActionRow1, ActionRow2)

        await message.showModal(Modal)

        try {

            let reponse = await message.awaitModalSubmit({ time: 300000 })

            let pseudo = reponse.fields.getTextInputValue('pseudo')
            let Message = reponse.fields.getTextInputValue('Message')


            await reponse.reply({ content: "Votre signalement à été envoyer avec succès !", ephemeral: true })

            let Embed = new Discord.EmbedBuilder()
                .setColor('#000')
                .setAuthor({ name: message.user.tag, iconURL: message.user.displayAvatarURL() })
                .setTitle('Un support à était envoyer')
                .addFields({ name: "Pseudo :", value: `\`\`\`${pseudo}\`\`\`` }, { name: "contacter le support :", value: `\`\`\`${Message}\`\`\``, inline: true })
                .setThumbnail(message.user.displayAvatarURL())
                .setTimestamp()
                .setFooter({ text: MxT.user.username, iconURL: MxT.user.displayAvatarURL() })

            await MxT.channels.cache.get("1016391025629081752").send({ embeds: [Embed] })

        } catch (err) { return; }
    }
}