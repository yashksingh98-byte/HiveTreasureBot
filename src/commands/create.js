import { SlashCommandBuilder } from 'discord.js';
import { HiveManager } from '../hive/HiveManager.js';

const hiveManager = new HiveManager();

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
    await interaction.deferReply();

    const username = interaction.options.getString('username');
    const map = interaction.options.getString('map') || 'random';
    const isPrivate = interaction.options.getBoolean('private') || false;

    try {
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

      await interaction.editReply({
        content: `🔄 Creating Treasure Wars 4v4 custom server...\n` +
                 `**Username:** ${username}\n` +
                 `**Map:** ${map}\n` +
                 `**Private:** ${isPrivate ? 'Yes' : 'No'}\n\n` +
                 `⚠️ **Setup Required:**\n` +
                 `This command requires Xbox Live authentication setup.\n` +
                 `Please refer to the SETUP.md file for Bedrock Protocol configuration.\n\n` +
                 `Once configured, the bot will:\n` +
                 `✅ Connect to Hive server\n` +
                 `✅ Navigate to custom games\n` +
                 `✅ Create Treasure Wars 4v4 lobby\n` +
                 `✅ Apply all your settings\n` +
                 `✅ Provide session ID for management`
      });

    } catch (error) {
      console.error('Error creating custom server:', error);
      await interaction.editReply({
        content: `❌ Error creating custom server: ${error.message}\n\n` +
                 `Please check SETUP.md for configuration instructions.`
      });
    }
  },
};
