import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import DisTube from 'distube'

import emotes from '../../emotes.json'

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Tell bot to play a song in current voice channel')
  .addStringOption((option) =>
    option
      .setName('song')
      .setDescription('The song URL to play')
      .setRequired(true)
  )

export const execute = async (
  interaction: ChatInputCommandInteraction,
  distube: DisTube
) => {
  try {
    if (interaction.inCachedGuild() && interaction.channel) {
      const inputUrl = interaction.options.getString('song')
      const channel = interaction.member.voice.channel

      if (!channel || !inputUrl) {
        await interaction.reply({
          content: `${emotes.error} | You must be in a voice channel!`,
          ephemeral: true,
        })
        return
      } else {
        await distube.play(channel, inputUrl, {
          member: interaction.member,
          textChannel: interaction.channel,
        })
        await interaction.reply({
          content: `${emotes.success} | Playing URL: ${inputUrl}`,
          ephemeral: true,
        })
      }
    } else {
      await interaction.reply({
        content: 'This command can only be used in a guild',
        ephemeral: true,
      })
    }
  } catch (e) {
    await interaction.reply({
      content: `${emotes.error} | ${e}`,
      ephemeral: true,
    })
  }
}
