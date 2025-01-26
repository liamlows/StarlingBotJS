import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class PauseCommand extends Command {
  readonly name = "pause";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("pause").setDescription("Pause the current song");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      this.distube.pause(interaction);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription("Paused!")],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
