import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class LeaveCommand extends Command {
  readonly name = "leave";
  override readonly inVoiceChannel = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("leave").setDescription("Leave bot from voice channel");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const vc = interaction.member?.voice?.channel;
    if (!vc) return; // Handled by inVoiceChannel property
    await interaction.deferReply();
    try {
      this.client.distube.voices.leave(interaction.guildId);
      await interaction.editReply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription(`Goodbye!`)],
      });
    } catch (e) {
      console.error(e);
      interaction.editReply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
