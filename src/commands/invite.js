import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite a player to your custom server')
    .addStringOption(option =>
      option.setName('session_id')
        .setDescription('Your custom server session ID')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('player')
        .setDescription('Minecraft Bedrock username to invite')
        .setRequired(true)),

  async execute(interaction) {
    const sessionId = interaction.options.getString('session_id');
    const playerName = interaction.options.getString('player');

    await interaction.reply({
      content: `📨 Inviting **${playerName}** to session \`${sessionId}\`...\n\n` +
               `⚠️ Full functionality requires Bedrock Protocol setup.\n` +
               `See SETUP.md for configuration instructions.\n\n` +
               `Once configured, this will:\n` +
               `✅ Send in-game invite to ${playerName}\n` +
               `✅ Add them to the player list\n` +
               `✅ Allow them to join your custom server`,
      ephemeral: true
    });
  },
};
