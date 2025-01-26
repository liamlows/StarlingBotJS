import SoundCloudPlugin from "@distube/soundcloud";
import { Command } from "..";
import { MessageFlags, SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export default class AuthSoundcloud extends Command {
  readonly name = "authsoundcloud";
  override readonly inVoiceChannel = true;
  readonly slashBuilder = new SlashCommandBuilder()
    .setName("authsoundcloud")
    .setDescription("Auth with soundcloud to allow playing of restricted tracks")
    .addStringOption(opt => opt.setName("clientid").setDescription("Use your soundcloud client id").setRequired(true))
    .addStringOption(opt =>
      opt.setName("oauthtoken").setDescription("Use your soundcloud ouath token").setRequired(true),
    );

  async onChatInput(interaction: ChatInputCommandInteraction<"cached">) {
    const clientid = interaction.options.getString("clientid", true);
    const oauthtoken = interaction.options.getString("oauthtoken", true);
    // await interaction.deferReply();
    console.log("Updating souncloud plugin with credentials...");
    try {
      this.client.distube.plugins[1] = new SoundCloudPlugin({ clientId: clientid, oauthToken: oauthtoken });
      await interaction.reply({
        content: `Authenticated with SoundCloud!`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (e) {
      console.error(e);
      await interaction.reply({ content: `Error: ${e}`, flags: MessageFlags.Ephemeral });
    }
  }
}
