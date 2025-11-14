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
    if (interaction.deferred || interaction.replied) {
      console.log('Interaction already handled, skipping...');
      return;
    }

    try {
      await interaction.deferReply();
    } catch (error) {
      console.error('Failed to defer reply:', error);
      return;
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
      
      await interaction.editReply({
        content: `✅ **Custom Server Session Created!**\n\n` +
                 `**Session ID:** \`${result.sessionId}\`\n` +
                 `**Username:** ${username}\n` +
                 `**Map:** ${map}\n` +
                 `**Private:** ${isPrivate ? 'Yes' : 'No'}\n` +
                 `**Status:** ${result.status}\n\n` +
                 `Use this session ID with other commands:\n` +
                 `• \`/settings ${result.sessionId}\` - Modify game settings\n` +
                 `• \`/invite ${result.sessionId} <player>\` - Invite players\n` +
                 `• \`/setrole ${result.sessionId} <player> <role>\` - Set roles\n` +
                 `• \`/status ${result.sessionId}\` - Check status\n` +
                 `• \`/close ${result.sessionId}\` - End session\n\n` +
                 `⚠️ **Note:** For full in-game functionality (actual Hive connection),\n` +
                 `you need to complete Xbox Live authentication setup.\n` +
                 `See **SETUP.md** for detailed instructions.`
      });

    } catch (error) {
      console.error('Error creating custom server:', error);
      await interaction.editReply({
        content: `❌ **Error creating custom server:** ${error.message}\n\n` +
                 `This might be due to:\n` +
                 `• Xbox Live authentication not configured\n` +
                 `• Network connection issues\n` +
                 `• Hive server unavailable\n\n` +
                 `Please check **SETUP.md** for configuration instructions.`
      });
    }
  },
};
