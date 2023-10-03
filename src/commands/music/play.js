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
        let inputUrl = interaction.options.getString('song')
        let channel = interaction.member.voice.channel
        await interaction.client.distube.play(channel, inputUrl, {
            member: interaction.member,
            textChannel: interaction.channel,
        })
    },
}
