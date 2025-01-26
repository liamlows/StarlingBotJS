import { Command } from "..";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class ClearCommand extends Command {
  readonly name = "clear";
  override readonly inVoiceChannel = true;
  override readonly playing = true;
  readonly slashBuilder = new SlashCommandBuilder().setName("clear").setDescription("Clear the queue");
  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    try {
      const queue = this.distube.getQueue(interaction.guildId);
      if (queue) {
        queue.remove();
        interaction.reply({
          embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription("Queue Cleared!")],
        });
      } else {
        interaction.reply({
          embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription("No queue to clear.")],
        });
      }
    } catch (e) {
      console.error(e);
      interaction.reply({
        embeds: [new EmbedBuilder().setColor("Blurple").setTitle("LW Music").setDescription(`Error: \`${e}\``)],
      });
    }
  }
}
