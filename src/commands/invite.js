import { SlashCommandBuilder } from 'discord.js';
import { hiveManager } from '../hive/HiveManager.js';

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

    try {
      const result = await hiveManager.invitePlayer(sessionId, playerName);
      
      await interaction.reply({
        content: `✅ Invited **${playerName}** to session \`${sessionId}\`\n` +
                 `**Current Players:** ${result.players.join(', ') || 'None yet'}\n\n` +
                 `⚠️ Note: Full in-game invites require Bedrock Protocol setup (see SETUP.md)`,
        ephemeral: true
      });
    } catch (error) {
      await interaction.reply({
        content: `❌ Error: ${error.message}`,
        ephemeral: true
      });
    }
  },
};
