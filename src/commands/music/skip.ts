import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('Tell bot to skip the current song in the playlist')
  .addStringOption((option) =>
    option.setName('index').setDescription('The number of songs to skip'),
  )

export const execute = async (
  interaction: ChatInputCommandInteraction,
  distube: DisTube,
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
      const index = Number(interaction.options.getString('index'))
      if (!queue)
        await interaction.reply({
          content: `${emotes.error} | There is nothing in the queue right now!`,
          ephemeral: true,
        })
      else {
        if (index) {
          if (isNaN(index))
            await interaction.reply({
              content: `${emotes.error} | Please enter a valid number!`,
              ephemeral: true,
            })
          else {
            const song = await queue.jump(index)
            await interaction.reply({
              content: `${emotes.success} | Skipped to: ${song.name}`,
              ephemeral: true,
            })
          }
        } else {
          const song = await queue.skip()
          await interaction.reply({
            content: `${emotes.success} | Skipped! Now playing:\n${song.name}`,
            ephemeral: true,
          })
        }
      }
    }
  } catch (e) {
    await interaction.reply({
      content: `${emotes.error} | ${e}`,
      ephemeral: true,
    })
  }
}
