const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Lists currently queued songs'),
    async execute(interaction) {
        try {
            let queue = interaction.client.distube.getQueue(interaction.guild)
            if (!queue)
                await interaction.reply({
                    content: `${interaction.client.emotes.error} | There is nothing in the queue right now!`,
                    ephemeral: true,
                })
            const q = queue.songs
                .slice(0, 15)
                .map(
                    (song, i) =>
                        `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${
                            song.formattedDuration
                        }\``
                )
                .join('\n')
            await interaction.channel.send(
                `${interaction.client.emotes.queue} | **Server Queue**\n${q}`
            )
        } catch (e) {
            await interaction.reply({
                content: `${interaction.client.emotes.error} | ${e}`,
                ephemeral: true,
            })
        }
    },
}
