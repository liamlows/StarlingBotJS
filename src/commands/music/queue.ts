import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('Lists currently queued songs')

export const execute = async (
  interaction: ChatInputCommandInteraction,
  distube: DisTube
) => {
  try {
    const { guildId } = interaction
    if (guildId === null) {
      await interaction.reply({
        content: `${emotes.error} | Missing guild id!`,
        ephemeral: true,
      })
    } else {
      const queue = distube.getQueue(guildId)
      if (!queue)
        await interaction.reply({
          content: `${emotes.error} | There is nothing in the queue right now!`,
          ephemeral: true,
        })
      else {
        const q = queue.songs
          .slice(0, 15)
          .map(
            (song, i) =>
              `${i === 0 ? 'Playing:' : `${i}.`} ${
                song.name
              } - \`${song.formattedDuration}\``
          )
          .join('\n')
        await interaction.reply({
          content: `${emotes.queue} | **Server Queue (only shows next 15 songs)**\n${q}`,
          ephemeral: true,
        })
      }
    }
  } catch (e) {
    await interaction.reply({
      content: `${emotes.error} | ${e}`,
      ephemeral: true,
    })
  }
}
