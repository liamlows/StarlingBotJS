import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class ShuffleCommand extends Command {
  readonly name = "shuffle";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("shuffle").setDescription("Shuffle the current queue");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      this.distube.shuffle(interaction);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription("Shuffled songs!")],
      });
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
