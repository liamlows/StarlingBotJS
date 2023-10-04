const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Tell bot to play a song in current voice channel')
        .addStringOption((option) =>
            option
                .setName('song')
                .setDescription('The song URL to play')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            let inputUrl = interaction.options.getString('song')
            let channel = interaction.member.voice.channel
            interaction.client.distube.play(channel, inputUrl, {
                member: interaction.member,
                textChannel: interaction.channel,
            })
            // await interaction.reply({
            //     content: `${interaction.client.emotes.success} | Playing URL: ${inputUrl}`,
            //     ephemeral: true,
            // })
        } catch (e) {
            await interaction.reply({
                content: `${interaction.client.emotes.error} | ${e}`,
                ephemeral: true,
            })
        }
    },
}
