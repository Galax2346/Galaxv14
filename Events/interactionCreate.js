const Discord = require("discord.js")

const transcript = require("discord-html-transcripts")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, SelectMenuBuilder } = require("discord.js")

module.exports = async(bot, interaction) => {

    if (interaction.isChatInputCommand()) {
        let command = require(`../Commandes/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options, bot.db);
    }
    if (interaction.isButton()) {
        if (interaction.customId.startsWith("verify_")) {
            const role = interaction.guild.roles.cache.get(interaction.customId.split("verify_")[1])
            interaction.member.roles.add(role.id).then(() => {
                interaction.reply({ content: `Vous avez accepté le <#1016394314680631346>! Vous pouvez maintenant accéder au serveur avec le rôle <@&${role.id}> `, ephemeral: true })
            })
        }
    }
    if (interaction.isButton()) {
        if (interaction.customId === "close") {
            let EmbedPermissionClose = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`❌ Vous n'avez pas la permission requise !`)

            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ embeds: [EmbedPermissionClose], ephemeral: true })

            let EmbedCloseTicket = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)
            let Button = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId('oui')
                    .setLabel("Oui")
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId('non')
                    .setLabel("Non")
                    .setStyle(ButtonStyle.Danger),
                );
            await interaction.reply({ embeds: [EmbedCloseTicket], components: [Button] });
        } else if (interaction.customId === "oui") {
            let EmbedPermissionClose = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`❌ Vous n'avez pas la permission requise !`)

            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ embeds: [EmbedPermissionClose], ephemeral: true })

            interaction.channel.delete();
        } else if (interaction.customId === "non") {
            let EmbedPermissionClose = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`❌ Vous n'avez pas la permission requise !`)

        } else if (interaction.customId === "transcript") {

            let EmbedSendTranscript = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`✅ Transcript envoyé avec succès !`)
            let EmbedTranscript = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`📑 Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)
            let EmbedPermissionTranscript = new EmbedBuilder()
                .setColor("#3dffcc")
                .setDescription(`❌ Vous n'avez pas la permission requise !`)

            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ embeds: [EmbedPermissionTranscript], ephemeral: true })

            await interaction.deferReply({ ephemeral: true })
            await bot.channels.cache.get("1019625530338857081").send({ embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)] })
            await interaction.editReply({ embeds: [EmbedSendTranscript], ephemeral: true })
        }
    }

    if (interaction.isSelectMenu()) {
        if (interaction.customId === 'menuticket') {
            if (interaction.values == 'Questions', 'Plainte', 'Bug') {
                const EmbedTicket1 = new EmbedBuilder()
                    .setColor("#ff00fb")
                    .setTitle(`Comment créer un ticket ?`)
                    .setDescription(`Pour **Ouvrir** un **Ticket** Séléctionnez la **catégorie** qui vous convient`)
                    .setImage('https://share.creavite.co/0kcUeXNa4tuL7TDa.gif')
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) });

                const RowTicket = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                        .setCustomId('menuticket')
                        .setPlaceholder('Sélectionner le type de ticket que vous voulez !')
                        .addOptions({
                            label: `Questions`,
                            description: `Poser une question de tout type`,
                            emoji: `❓`,
                            value: `Questions`,
                        }, {
                            label: `Plainte`,
                            description: `Faire une plainte envers un staff ou un membre du Discord`,
                            emoji: `🖋`,
                            value: `Plainte`,
                        }, {
                            label: `Bug`,
                            description: `Signaler un bug`,
                            emoji: `⚠`,
                            value: `Bug`,
                        }, ),
                    );
                await interaction.deferUpdate();
                await interaction.editReply({ embeds: [EmbedTicket1], components: [RowTicket] })
                let channel = await interaction.guild.channels.create({
                    parent: "1028384156788461720",
                    name: `${interaction.values}-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [{
                        id: interaction.user,
                        allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
                    }, ],
                });
                let EmbedCreateChannel = new EmbedBuilder()
                    .setColor("#3dffcc")
                    .setTitle('Ticket ouvert')
                    .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre problème !")
                    .setTimestamp()
                    .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) });
                const Row = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId('close')
                        .setLabel('Fermer le ticket')
                        .setEmoji('🗑️')
                        .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                        .setCustomId('transcript')
                        .setLabel('Demander le transcript')
                        .setEmoji('📑')
                        .setStyle(ButtonStyle.Primary),
                    );


                await channel.send({ embeds: [EmbedCreateChannel], components: [Row] })
                const EmbedSuccessCreateChannel = new EmbedBuilder()
                    .setColor("#3dffcc")
                    .setDescription(`✅ Votre salon a été créé avec succès ${channel} !`)


                await interaction.followUp({ embeds: [EmbedSuccessCreateChannel], ephemeral: true })
            }
        }
    }
}