import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class ResumeCommand extends Command {
  readonly name = "resume";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("resume").setDescription("Resume the current song");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      this.distube.resume(interaction);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription("Resuming!")],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
