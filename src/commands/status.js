import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { hiveManager } from '../hive/HiveManager.js';

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check status of active custom servers')
    .addStringOption(option =>
      option.setName('session_id')
        .setDescription('Specific session ID to check')
        .setRequired(false)),

  async execute(interaction) {
    const sessionId = interaction.options.getString('session_id');

    if (sessionId) {
      const session = hiveManager.getSessionStatus(sessionId);
      
      if (!session) {
        await interaction.reply({
          content: `❌ Session \`${sessionId}\` not found.`,
          ephemeral: true
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`🎮 Session: ${sessionId}`)
        .setColor(session.status === 'connected' ? 0x00AE86 : 0xFF6B6B)
        .addFields(
          { name: 'Status', value: session.status, inline: true },
          { name: 'Players', value: session.players.length.toString(), inline: true },
          { name: 'Created', value: session.createdAt.toLocaleString(), inline: true },
          { name: 'Map', value: session.settings.map || 'Random', inline: true },
          { name: 'Private', value: session.settings.private_game ? 'Yes' : 'No', inline: true }
        );

      await interaction.reply({ embeds: [embed] });
    } else {
      const sessions = hiveManager.getAllActiveSessions();
      
      if (sessions.length === 0) {
        await interaction.reply({
          content: '📭 No active custom servers.\n\nUse `/create` to start a new Treasure Wars 4v4 game!',
          ephemeral: true
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('🎮 Active Custom Servers')
        .setDescription(`${sessions.length} active session(s)`)
        .setColor(0x00AE86);

      sessions.forEach(session => {
        embed.addFields({
          name: session.sessionId,
          value: `**Status:** ${session.status}\n**Players:** ${session.players.length}\n**Map:** ${session.settings.map}`,
          inline: true
        });
      });

      await interaction.reply({ embeds: [embed] });
    }
  },
};
