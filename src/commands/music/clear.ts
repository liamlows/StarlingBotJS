import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription(
    'Tell bot to clear queue. The current song will continue playing'
  )

export const execute = async (
  interaction: ChatInputCommandInteraction<CacheType>,
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
        queue.remove()
        await interaction.reply({
          content: `${emotes.success} | Queue cleared!`,
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

// "eslint-config-node": "^4.1.0",
// "eslint-config-prettier": "^9.1.0",
// "eslint-plugin-node": "^11.1.0",
// "eslint-plugin-prettier": "^5.1.3",
