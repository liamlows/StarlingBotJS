const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Tell bot to join current voice channel'),
    async execute(interaction) {
        let voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            await interaction.reply({
                content: 'You must be in a voice channel',
                ephemeral: true,
            })
        } else {
            await interaction.client.distube.voices.join(voiceChannel)
            await interaction.reply({
                content: 'Joining voice channel!',
                ephemeral: true,
            })
        }
    },
}
