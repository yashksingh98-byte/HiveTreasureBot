import { SlashCommandBuilder } from 'discord.js';
import { hiveManager } from '../hive/HiveManager.js';

export default {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Close an active custom server session')
    .addStringOption(option =>
      option.setName('session_id')
        .setDescription('Session ID to close')
        .setRequired(true)),

  async execute(interaction) {
    const sessionId = interaction.options.getString('session_id');

    try {
      await hiveManager.closeSession(sessionId);
      
      await interaction.reply({
        content: `✅ Successfully closed session \`${sessionId}\``,
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
