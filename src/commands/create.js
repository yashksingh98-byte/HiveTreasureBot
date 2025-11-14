import { SlashCommandBuilder } from 'discord.js';
import { hiveManager } from '../hive/HiveManager.js';

export default {
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a new Treasure Wars 4v4 custom server on Hive')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Your Minecraft Bedrock username')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('map')
        .setDescription('Select a map')
        .setRequired(false)
        .addChoices(
          { name: 'Random', value: 'random' },
          { name: 'Ocean', value: 'ocean' },
          { name: 'Western', value: 'western' },
          { name: 'Pirates', value: 'pirates' },
          { name: 'Winter', value: 'winter' },
          { name: 'Oriental', value: 'oriental' },
          { name: 'Volcanic', value: 'volcanic' },
          { name: 'Desert', value: 'desert' },
          { name: 'Lost City', value: 'lost_city' }
        ))
    .addBooleanOption(option =>
      option.setName('private')
        .setDescription('Make this a private game?')
        .setRequired(false)),

  async execute(interaction) {
    try {
      if (!interaction.deferred && !interaction.replied) {
        await interaction.deferReply();
      }
    } catch (error) {
      if (error.code !== 40060) {
        console.error('Failed to defer reply:', error);
        return;
      }
    }

    const username = interaction.options.getString('username');
    const map = interaction.options.getString('map') || 'random';
    const isPrivate = interaction.options.getBoolean('private') || false;

    const defaultSettings = {
      map: map,
      private_game: isPrivate,
      game_mode: 'treasure_wars_4v4',
      max_players: 16,
      team_size: 4,
      health: 20,
      health_regen: true,
      respawn: true,
      respawn_time: 5,
      starting_gear: 'standard',
      treasure_multiplier: 1.0,
      chest_refill: true,
      chest_refill_time: 60,
      pvp_enabled: true,
      fall_damage: true,
      friendly_fire: false,
      game_duration: 20,
      sudden_death: true,
      sudden_death_time: 15,
      treasure_protection: 30,
      block_break: true,
      block_place: true,
      instant_break: false,
      shop_enabled: true,
      custom_shop_prices: false,
      armor_enabled: true,
      enchantments: true,
      potions: true,
      bow_enabled: true,
      tnt_enabled: true,
      enderpearls: true,
      team_balance: true,
      spectator_mode: true
    };

    try {
      const result = await hiveManager.createCustomServer(username, null, defaultSettings, false);
      
      if (interaction.deferred) {
        await interaction.editReply({
          content: `✅ **Custom Server Session Created!**\n\n` +
                   `**Session ID:** \`${result.sessionId}\`\n` +
                   `**Username:** ${username}\n` +
                   `**Map:** ${map}\n` +
                   `**Private:** ${isPrivate ? 'Yes' : 'No'}\n` +
                   `**Status:** ${result.status}\n\n` +
                   `Use this session ID with other commands:\n` +
                   `• \`/settings\` - View/modify game settings\n` +
                   `• \`/invite\` - Invite players\n` +
                   `• \`/setrole\` - Set roles/teams\n` +
                   `• \`/status\` - Check status\n` +
                   `• \`/close\` - End session\n\n` +
                   `🎮 **Successfully connected to Hive!**`
        });
      }

    } catch (error) {
      console.error('Error creating custom server:', error);
      
      try {
        const errorMessage = {
          content: `❌ **Connection Failed**\n\n` +
                   `Error: ${error.message}\n\n` +
                   `**Possible reasons:**\n` +
                   `• Hive servers may only accept official Minecraft clients\n` +
                   `• Your network or ISP may be blocking the connection\n` +
                   `• The bot's authentication may not be fully supported\n\n` +
                   `**What you can do:**\n` +
                   `• Try running this bot from a different network\n` +
                   `• Check if you can connect to Hive from Minecraft directly\n` +
                   `• Note: Hive may restrict bot/automation connections`
        };
        
        if (interaction.deferred) {
          await interaction.editReply(errorMessage);
        } else if (!interaction.replied) {
          await interaction.reply(errorMessage);
        }
      } catch (replyError) {
        console.error('Could not send error message to Discord:', replyError.message);
      }
    }
  },
};
