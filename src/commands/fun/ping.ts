import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!')

export async function execute(interaction: CommandInteraction) {
  console.log(interaction.type)

  await interaction.reply('Pong!')
}
